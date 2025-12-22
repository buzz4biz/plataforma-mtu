import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { ENV } from "./env";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  // Try session-based auth first
  const sessionUserId = (opts.req.session as any)?.userId;
  console.log("[Context] Creating context:", {
    sessionId: opts.req.sessionID,
    sessionUserId,
    hasCookie: !!opts.req.headers.cookie,
  });
  
  if (sessionUserId) {
    const db = await getDb();
    if (db) {
      const [sessionUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, sessionUserId))
        .limit(1);
      if (sessionUser) {
        user = sessionUser;
        console.log("[Context] User found from session:", { userId: user.id, email: user.email });
      }
    }
  }

  // Fallback to OAuth if no session user
  if (!user) {
    try {
      user = await sdk.authenticateRequest(opts.req);
    } catch (error) {
      // In development mode without OAuth, create a mock user
      if (!ENV.isProduction && !ENV.oAuthServerUrl) {
        user = {
          id: 1,
          openId: "dev-user",
          name: "Usuário de Desenvolvimento",
          email: "dev@localhost",
          loginMethod: "dev",
          role: "user",
          lastSignedIn: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User;
        console.log("[Auth] Using development mock user");
      } else {
        // Authentication is optional for public procedures.
        user = null;
      }
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
