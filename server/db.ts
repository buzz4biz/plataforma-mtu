import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import path from "path";

let _db: ReturnType<typeof drizzle> | null = null;
let _initialized = false;

// Initialize database tables
async function initializeTables(db: ReturnType<typeof drizzle>) {
  if (_initialized) return;
  
  try {
    console.log("[Database] Initializing tables...");
    
    // Create users table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        loginMethod TEXT NOT NULL DEFAULT 'local',
        role TEXT NOT NULL DEFAULT 'user',
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create user_progress table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        moduleId TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        completedAt TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    // Create exercise_responses table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS exercise_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        moduleId TEXT NOT NULL,
        exerciseId TEXT NOT NULL,
        response TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    _initialized = true;
    console.log("[Database] ✓ Tables initialized successfully");
  } catch (error) {
    console.error("[Database] Failed to initialize tables:", error);
  }
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db) {
    console.log("[Database] getDb called, DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
  }
  
  if (!_db && process.env.DATABASE_URL) {
    try {
      let dbUrl = process.env.DATABASE_URL;
      
      console.log("[Database] Original DATABASE_URL:", dbUrl);
      
      // Handle different URL formats
      if (dbUrl.startsWith('file:')) {
        const dbPath = dbUrl.replace(/^file:/, '');
        console.log("[Database] Extracted path:", dbPath);
        
        // For absolute paths (production/Render), keep as-is
        if (path.isAbsolute(dbPath)) {
          dbUrl = `file:${dbPath}`;
          console.log("[Database] Using absolute path:", dbUrl);
        } else {
          // For relative paths (local development), resolve to absolute
          const absolutePath = path.resolve(dbPath);
          dbUrl = `file:${absolutePath}`;
          console.log("[Database] Resolved relative path to:", dbUrl);
        }
      }
      
      console.log("[Database] Final connection URL:", dbUrl);
      const client = createClient({ url: dbUrl });
      _db = drizzle(client);
      
      // Initialize tables on first connection
      await initializeTables(_db);
      
      console.log("[Database] ✓ Connection successful");
    } catch (error) {
      console.error("[Database] ❌ Failed to connect:", error);
      if (error instanceof Error) {
        console.error("[Database] Error details:", error.message);
        console.error("[Database] Stack:", error.stack);
      }
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.
