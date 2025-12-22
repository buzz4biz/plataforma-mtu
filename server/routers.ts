import { COOKIE_NAME } from "@shared/const";
import { MTU_SYSTEM_PROMPT, FULL_KNOWLEDGE_BASE } from "@shared/mtuKnowledge";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeGroq } from "./_core/groq";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { userProgress, userBadges, userExercises } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
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
      
      const completedModules = await db.select().from(userProgress).where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.lessonId, "_module_complete"),
          eq(userProgress.completed, 1)
        )
      );
      
      const completedLessons = await db.select().from(userProgress).where(
        and(eq(userProgress.userId, userId), eq(userProgress.completed, 1))
      );
      
      const totalModules = 7;
      const completedModulesCount = completedModules.length;
      const progressPercentage = Math.round((completedModulesCount / totalModules) * 100);
      
      return { completedModules: completedModulesCount, totalModules, progressPercentage, completedLessons: completedLessons.length };
    }),
  }),

  // Badges router para gerenciar conquistas
  badges: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const userId = ctx.user.id;
      return await db.select().from(userBadges).where(eq(userBadges.userId, userId));
    }),

    award: protectedProcedure
      .input(z.object({ badgeId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return { success: false, awarded: false };
        const userId = ctx.user.id;
        
        const existing = await db.select().from(userBadges).where(
          and(eq(userBadges.userId, userId), eq(userBadges.badgeId, input.badgeId))
        );
        
        if (existing.length === 0) {
          await db.insert(userBadges).values({ userId, badgeId: input.badgeId });
          return { success: true, awarded: true };
        }
        return { success: true, awarded: false };
      }),

    has: protectedProcedure
      .input(z.object({ badgeId: z.string() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return { hasBadge: false };
        const userId = ctx.user.id;
        
        const badge = await db.select().from(userBadges).where(
          and(eq(userBadges.userId, userId), eq(userBadges.badgeId, input.badgeId))
        );
        return { hasBadge: badge.length > 0 };
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
});

export type AppRouter = typeof appRouter;
