import { z } from "zod";
import bcrypt from "bcryptjs";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Banco de dados não disponível",
        });
      }

      // Check if user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (existingUser.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Este email já está cadastrado",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create user
      const [newUser] = await db.insert(users).values({
        name: input.name,
        email: input.email,
        password: hashedPassword,
        loginMethod: "local",
        role: "user",
        lastSignedIn: new Date(),
      });

      // Get the created user
      const createdUser = await db
        .select()
        .from(users)
        .where(eq(users.id, newUser.insertId))
        .limit(1);

      if (!createdUser[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar usuário",
        });
      }

      // Set session and save it
      return new Promise((resolve, reject) => {
        (ctx.req.session as any).userId = createdUser[0].id;
        
        ctx.req.session.save((err) => {
          if (err) {
            console.error("[Auth] Session save error:", err);
            reject(new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Erro ao salvar sessão",
            }));
          } else {
            console.log("[Auth] Signup successful:", {
              userId: createdUser[0].id,
              email: createdUser[0].email,
              sessionId: ctx.req.sessionID,
            });

            resolve({
              success: true,
              user: {
                id: createdUser[0].id,
                name: createdUser[0].name,
                email: createdUser[0].email,
              },
            });
          }
        });
      });
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Email inválido"),
        password: z.string().min(1, "Senha é obrigatória"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Banco de dados não disponível",
        });
      }

      // Find user by email
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou senha incorretos",
        });
      }

      // Verify password
      if (!user.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Usuário não possui senha local. Use outro método de login.",
        });
      }

      const isValidPassword = await bcrypt.compare(input.password, user.password);

      if (!isValidPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou senha incorretos",
        });
      }

      // Update last signed in
      await db
        .update(users)
        .set({ lastSignedIn: new Date() })
        .where(eq(users.id, user.id));

      // Set session and save it
      return new Promise((resolve, reject) => {
        (ctx.req.session as any).userId = user.id;
        
        ctx.req.session.save((err) => {
          if (err) {
            console.error("[Auth] Session save error:", err);
            reject(new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Erro ao salvar sessão",
            }));
          } else {
            // Log session creation
            console.log("[Auth] Login successful:", {
              userId: user.id,
              email: user.email,
              sessionId: ctx.req.sessionID,
            });

            resolve({
              success: true,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        });
      });
    }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    return new Promise((resolve, reject) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          reject(
            new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Erro ao fazer logout",
            })
          );
        } else {
          ctx.res.clearCookie("connect.sid", {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });
          resolve({ success: true });
        }
      });
    });
  }),

  getCurrentUser: publicProcedure.query(({ ctx }) => {
    console.log("[Auth] getCurrentUser called:", {
      hasUser: !!ctx.user,
      userId: ctx.user?.id,
      sessionId: ctx.req.sessionID,
    });
    
    if (!ctx.user) {
      return null;
    }

    return {
      id: ctx.user.id,
      name: ctx.user.name,
      email: ctx.user.email,
      role: ctx.user.role,
    };
  }),

  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email("Email inválido"),
        newPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Banco de dados não disponível",
        });
      }

      // Find user by email
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado com este email",
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(input.newPassword, 10);

      // Update user password
      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, user.id));

      console.log("[Auth] Password reset successful:", {
        userId: user.id,
        email: user.email,
      });

      return {
        success: true,
        message: "Senha redefinida com sucesso",
      };
    }),
});
