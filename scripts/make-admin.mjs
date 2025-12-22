/**
 * Script para promover um usuário a administrador
 * Execute com: node scripts/make-admin.mjs <email>
 */

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Definir schema do usuário
const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    openId: text("openId").unique(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    loginMethod: text("loginMethod").default("local").notNull(),
    role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

const email = process.argv[2];

if (!email) {
    console.error('❌ Por favor, forneça um email como argumento');
    console.log('Uso: node scripts/make-admin.mjs <email>');
    process.exit(1);
}

async function makeAdmin() {
    try {
        const dbUrl = process.env.DATABASE_URL;

        if (!dbUrl) {
            console.error('❌ DATABASE_URL não encontrada no arquivo .env');
            process.exit(1);
        }

        console.log('📦 Conectando ao banco de dados...');
        const client = createClient({ url: dbUrl });
        const db = drizzle(client);

        // Buscar usuário
        console.log(`🔍 Procurando usuário: ${email}`);
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (!user || user.length === 0) {
            console.error(`❌ Usuário não encontrado com o email: ${email}`);
            console.log('\n💡 Dica: Certifique-se de que o usuário já está cadastrado na plataforma.');
            process.exit(1);
        }

        if (user[0].role === 'admin') {
            console.log(`✅ ${email} já é administrador!`);
            process.exit(0);
        }

        // Promover a admin
        console.log('⚡ Promovendo usuário a administrador...');
        await db
            .update(users)
            .set({ role: 'admin' })
            .where(eq(users.id, user[0].id));

        console.log(`\n✅ Sucesso! ${email} foi promovido a administrador!\n`);
        console.log('📝 Próximos passos:');
        console.log('   1. Faça logout da plataforma');
        console.log('   2. Faça login novamente');
        console.log('   3. Acesse /admin ou clique no botão "Dashboard Admin"\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao promover usuário:', error.message);
        process.exit(1);
    }
}

makeAdmin();
