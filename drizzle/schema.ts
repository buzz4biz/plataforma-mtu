import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = sqliteTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: text("openId").unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"), // Hashed password for local auth
  loginMethod: text("loginMethod").default("local").notNull(),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Tabela de progresso do usuário nos módulos
export const userProgress = sqliteTable("userProgress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull().references(() => users.id),
  moduleId: text("moduleId").notNull(), // Ex: "modulo-1", "modulo-2a", "bonus-1"
  lessonId: text("lessonId"), // Ex: "parte-1", "exercicio-1"
  completed: integer("completed").default(0).notNull(), // 0 = não, 1 = sim
  completedAt: integer("completedAt", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

// Tabela de badges/conquistas do usuário
export const userBadges = sqliteTable("userBadges", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull().references(() => users.id),
  badgeId: text("badgeId").notNull(), // Ex: "diagnostico-completo", "mecanismo-extraido"
  earnedAt: integer("earnedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

// Tabela de respostas dos exercícios
export const userExercises = sqliteTable("userExercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull().references(() => users.id),
  moduleId: text("moduleId").notNull(),
  exerciseId: text("exerciseId").notNull(),
  response: text("response"), // Resposta do usuário em JSON
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type UserExercise = typeof userExercises.$inferSelect;
export type InsertUserExercise = typeof userExercises.$inferInsert;