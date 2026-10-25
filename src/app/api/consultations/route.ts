/**
 * ============================================
 * GET/POST /api/consultations
 * ============================================
 * POST: cria solicitação de consulta (público). GET: lista consultas (admin vê todas, usuário vê as suas).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { consultations } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, country, message } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se há token (usuário logado)
    const token = request.cookies.get('token')?.value;
    let userId = null;

    if (token) {
      const decoded = await verifyToken(token);
      if (decoded && decoded.type === 'user') {
        userId = decoded.id;
      }
    }

    const [consultation] = await db.insert(consultations).values({
      userId,
      name,
      email,
      phone,
      service,
      country,
      message,
    }).returning();

    return NextResponse.json({
      message: 'Consulta agendada com sucesso! Entraremos em contato em breve.',
      consultation,
    });
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    return NextResponse.json(
      { error: 'Erro ao agendar consulta' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    let consultationsList;

    if (decoded.type === 'admin') {
      // Admin vê todas as consultas
      consultationsList = await db.select().from(consultations).orderBy(consultations.createdAt);
    } else {
      // Usuário vê apenas suas consultas
      consultationsList = await db.select()
        .from(consultations)
        .where(eq(consultations.userId, decoded.id))
        .orderBy(consultations.createdAt);
    }

    return NextResponse.json({ consultations: consultationsList });
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar consultas' },
      { status: 500 }
    );
  }
}
