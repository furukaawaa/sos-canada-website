/**
 * ============================================
 * POST /api/auth/login
 * ============================================
 * Autentica um cliente existente.
 *
 * Body: { email, password }
 * Retorna: { user, token }
 *
 * Segurança:
 *   - Nunca revela se o erro foi email OU senha (credenciais inválidas genérico)
 *   - Senha verificada com bcrypt
 */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
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

    // Busca usuário pelo email
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    // Mensagem genérica — não revela se o email existe ou não
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verifica a senha com bcrypt
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Login bem-sucedido — gera token JWT
    const token = await createToken({ id: user.id, email: user.email, type: 'user' });

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
