import { COOKIE_NAME } from "@shared/const";
import { MTU_SYSTEM_PROMPT, FULL_KNOWLEDGE_BASE } from "@shared/mtuKnowledge";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeGroq } from "./_core/groq";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { userProgress, userExercises, users } from "../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";
import { z } from "zod";
import { authRouter } from "./auth.router";

// Schema para mensagens do chat
const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const chatInputSchema = z.object({
  messages: z.array(messageSchema),
});

export const appRouter = router({
  system: systemRouter,
  auth: authRouter,

  // Chat router para o Assistente MTU
  chat: router({
    sendMessage: publicProcedure
      .input(chatInputSchema)
      .mutation(async ({ input }) => {
        const { messages } = input;
        const llmMessages = [
          {
            role: "system" as const,
            content: `${MTU_SYSTEM_PROMPT}\n\n=== BASE DE CONHECIMENTO DO PROTOCOLO MTU™ ===\n\n${FULL_KNOWLEDGE_BASE}`,
          },
          ...messages.map(msg => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
        ];

        try {
          const response = await invokeGroq({ messages: llmMessages });
          const assistantMessage = response.choices[0]?.message?.content ||
            "Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.";
          return { success: true, message: assistantMessage };
        } catch (error) {
          console.error("Erro ao chamar Groq:", error);
          return { success: false, message: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente." };
        }
      }),
  }),

  // Progress router para salvar/carregar progresso do usuário
  progress: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const userId = ctx.user.id;
      return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
    }),

    getByModule: protectedProcedure
      .input(z.object({ moduleId: z.string() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return [];
        const userId = ctx.user.id;
        return await db.select().from(userProgress).where(
          and(eq(userProgress.userId, userId), eq(userProgress.moduleId, input.moduleId))
        );
      }),

    completeLesson: protectedProcedure
      .input(z.object({ moduleId: z.string(), lessonId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return { success: false, error: "Database not available" };
        const userId = ctx.user.id;

        const existing = await db.select().from(userProgress).where(
          and(
            eq(userProgress.userId, userId),
            eq(userProgress.moduleId, input.moduleId),
            eq(userProgress.lessonId, input.lessonId)
          )
        );

        if (existing.length > 0) {
          await db.update(userProgress)
            .set({ completed: 1, completedAt: new Date() })
            .where(eq(userProgress.id, existing[0].id));
        } else {
          await db.insert(userProgress).values({
            userId,
            moduleId: input.moduleId,
            lessonId: input.lessonId,
            completed: 1,
            completedAt: new Date(),
          });
        }
        return { success: true };
      }),

    completeModule: protectedProcedure
      .input(z.object({ moduleId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return { success: false, error: "Database not available" };
        const userId = ctx.user.id;

        console.log("[Progress] Completing module:", { userId, moduleId: input.moduleId });

        const existing = await db.select().from(userProgress).where(
          and(
            eq(userProgress.userId, userId),
            eq(userProgress.moduleId, input.moduleId),
            eq(userProgress.lessonId, "_module_complete")
          )
        );

        if (existing.length === 0) {
          await db.insert(userProgress).values({
            userId,
            moduleId: input.moduleId,
            lessonId: "_module_complete",
            completed: 1,
            completedAt: new Date(),
          });
          console.log("[Progress] Module completion saved");
        } else {
          console.log("[Progress] Module already completed");
        }
        return { success: true };
      }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return { completedModules: 0, totalModules: 7, progressPercentage: 0, completedLessons: 0 };
      const userId = ctx.user.id;

      console.log("[Stats] Getting stats for user:", userId);

      const completedModules = await db.select().from(userProgress).where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.lessonId, "_module_complete"),
          eq(userProgress.completed, 1)
        )
      );

      console.log("[Stats] Completed modules:", completedModules);

      const completedLessons = await db.select().from(userProgress).where(
        and(eq(userProgress.userId, userId), eq(userProgress.completed, 1))
      );

      const totalModules = 7;
      const completedModulesCount = completedModules.length;
      const progressPercentage = Math.round((completedModulesCount / totalModules) * 100);

      console.log("[Stats] Result:", { completedModulesCount, totalModules, progressPercentage, completedLessons: completedLessons.length });

      return { completedModules: completedModulesCount, totalModules, progressPercentage, completedLessons: completedLessons.length };
    }),
  }),

  // Exercises router para salvar respostas dos exercícios
  exercises: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const userId = ctx.user.id;
      return await db.select().from(userExercises).where(eq(userExercises.userId, userId));
    }),

    get: protectedProcedure
      .input(z.object({ moduleId: z.string(), exerciseId: z.string() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return null;
        const userId = ctx.user.id;

        const exercise = await db.select().from(userExercises).where(
          and(
            eq(userExercises.userId, userId),
            eq(userExercises.moduleId, input.moduleId),
            eq(userExercises.exerciseId, input.exerciseId)
          )
        );
        return exercise[0] || null;
      }),

    save: protectedProcedure
      .input(z.object({ moduleId: z.string(), exerciseId: z.string(), response: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return { success: false };
        const userId = ctx.user.id;

        const existing = await db.select().from(userExercises).where(
          and(
            eq(userExercises.userId, userId),
            eq(userExercises.moduleId, input.moduleId),
            eq(userExercises.exerciseId, input.exerciseId)
          )
        );

        if (existing.length > 0) {
          await db.update(userExercises)
            .set({ response: input.response })
            .where(eq(userExercises.id, existing[0].id));
        } else {
          await db.insert(userExercises).values({
            userId,
            moduleId: input.moduleId,
            exerciseId: input.exerciseId,
            response: input.response,
          });
        }
        return { success: true };
      }),
  }),

  // Admin router para dashboard administrativo
  admin: router({
    // Listar todos os usuários
    getAllUsers: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];

      const allUsers = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        loginMethod: users.loginMethod,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
      }).from(users);

      return allUsers;
    }),

    // Obter detalhes de um usuário específico
    getUserDetails: adminProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;

        const user = await db.select().from(users).where(eq(users.id, input.userId));
        if (user.length === 0) return null;

        const progress = await db.select().from(userProgress).where(eq(userProgress.userId, input.userId));
        const exercises = await db.select().from(userExercises).where(eq(userExercises.userId, input.userId));

        return {
          user: user[0],
          progress,
          exercises,
        };
      }),

    // Obter todas as respostas de todos os usuários
    getAllResponses: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];

      const responses = await db
        .select({
          id: userExercises.id,
          userId: userExercises.userId,
          userName: users.name,
          userEmail: users.email,
          moduleId: userExercises.moduleId,
          exerciseId: userExercises.exerciseId,
          response: userExercises.response,
          createdAt: userExercises.createdAt,
          updatedAt: userExercises.updatedAt,
        })
        .from(userExercises)
        .leftJoin(users, eq(userExercises.userId, users.id));

      return responses;
    }),

    // Obter estatísticas gerais da plataforma
    getPlatformStats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return {
        totalUsers: 0,
        activeUsers: 0,
        totalResponses: 0,
        completedModules: 0,
        averageProgress: 0,
      };

      // Total de usuários
      const totalUsersResult = await db.select({ count: sql<number>`count(*)` }).from(users);
      const totalUsers = totalUsersResult[0]?.count || 0;

      // Usuários ativos (com pelo menos uma resposta)
      const activeUsersResult = await db
        .select({ count: sql<number>`count(distinct ${userExercises.userId})` })
        .from(userExercises);
      const activeUsers = activeUsersResult[0]?.count || 0;

      // Total de respostas
      const totalResponsesResult = await db.select({ count: sql<number>`count(*)` }).from(userExercises);
      const totalResponses = totalResponsesResult[0]?.count || 0;

      // Módulos completados
      const completedModulesResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(userProgress)
        .where(and(eq(userProgress.lessonId, "_module_complete"), eq(userProgress.completed, 1)));
      const completedModules = completedModulesResult[0]?.count || 0;

      // Progresso médio (% de módulos completados por usuário)
      const averageProgress = totalUsers > 0 ? Math.round((completedModules / (totalUsers * 7)) * 100) : 0;

      return {
        totalUsers,
        activeUsers,
        totalResponses,
        completedModules,
        averageProgress,
      };
    }),

    // Obter respostas agrupadas por módulo e exercício
    getResponsesByModule: adminProcedure
      .input(z.object({ moduleId: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];

        const responses = await db
          .select({
            id: userExercises.id,
            userId: userExercises.userId,
            userName: users.name,
            userEmail: users.email,
            exerciseId: userExercises.exerciseId,
            response: userExercises.response,
            updatedAt: userExercises.updatedAt,
          })
          .from(userExercises)
          .leftJoin(users, eq(userExercises.userId, users.id))
          .where(eq(userExercises.moduleId, input.moduleId));

        return responses;
      }),
  }),
});

export type AppRouter = typeof appRouter;
