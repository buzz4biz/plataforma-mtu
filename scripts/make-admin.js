/**
 * Script para promover um usuário a administrador
 * Execute com: node scripts/make-admin.js <email>
 */

import { getDb } from '../server/db.js';
import { users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const email = process.argv[2];

if (!email) {
    console.error('❌ Por favor, forneça um email como argumento');
    console.log('Uso: node scripts/make-admin.js <email>');
    process.exit(1);
}

async function makeAdmin() {
    try {
        const db = await getDb();
        if (!db) {
            console.error('❌ Não foi possível conectar ao banco de dados');
            process.exit(1);
        }

        // Buscar usuário
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (!user) {
            console.error(`❌ Usuário não encontrado com o email: ${email}`);
            process.exit(1);
        }

        if (user.role === 'admin') {
            console.log(`✓ ${email} já é administrador`);
            process.exit(0);
        }

        // Promover a admin
        await db
            .update(users)
            .set({ role: 'admin' })
            .where(eq(users.id, user.id));

        console.log(`✓ ${email} foi promovido a administrador com sucesso!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao promover usuário:', error);
        process.exit(1);
    }
}

makeAdmin();
