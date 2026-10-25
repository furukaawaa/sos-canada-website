/**
 * ============================================
 * POST /api/auth/admin/login
 * ============================================
 * Autentica administradores. Retorna token JWT com type=admin.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { admins } from '@/db/schema';
import { comparePassword, createToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar admin
    const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);

    if (!admin) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar senha
    const isValidPassword = await comparePassword(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Criar token
    const token = await createToken({ id: admin.id, email: admin.email, type: 'admin' });

    return NextResponse.json({
      message: 'Login administrativo realizado com sucesso',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no login admin:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
