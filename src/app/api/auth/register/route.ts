/**
 * ============================================
 * POST /api/auth/register
 * ============================================
 * Registra um novo cliente.
 *
 * Body: { name, email, password, phone?, cpf? }
 * Retorna: { user, token } — token JWT de 7 dias
 *
 * Validações:
 *   - email único no banco
 *   - senha hasheada com bcrypt antes de salvar
 */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword, createToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, cpf } = body;

    // Validação básica de campos obrigatórios
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Garante que o email não está cadastrado
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha — nunca salva em texto puro
    const hashedPassword = await hashPassword(password);

    // Cria o usuário e retorna os dados dele
    const [newUser] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      phone,
      cpf,
    }).returning();

    // Gera o token JWT para login automático pós-registro
    const token = await createToken({ id: newUser.id, email: newUser.email, type: 'user' });

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
}
