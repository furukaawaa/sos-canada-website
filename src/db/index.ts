/**
 * ============================================
 * Database Connection — Drizzle ORM + PostgreSQL
 * ============================================
 *
 * Cliente singleton compartilhado por toda a aplicação.
 *
 * Em desenvolvimento, o pool é guardado em `globalThis` para
 * evitar múltiplas conexões durante hot-reload do Next.js.
 *
 * Uso:
 *   import { db } from '@/db';
 *   const users = await db.select().from(usersTable);
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

// Falha rápido se a env var não estiver configurada
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

// Singleton pattern para o pool de conexões
const globalForDb = globalThis as typeof globalThis & {
  __appPostgresPool?: Pool;
};

export const pool =
  globalForDb.__appPostgresPool ??
  new Pool({
    connectionString: databaseUrl,
  });

// Em dev, guarda o pool no globalThis para sobreviver ao hot-reload
if (process.env.NODE_ENV !== "production") {
  globalForDb.__appPostgresPool = pool;
}

/** Cliente Drizzle pronto para queries */
export const db = drizzle(pool);
