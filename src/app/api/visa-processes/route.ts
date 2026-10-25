/**
 * ============================================
 * GET/POST /api/visa-processes
 * ============================================
 * POST: cria processo de visto (usuário logado). GET: lista processos (filtrado por permissão).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visaProcesses } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { generateProcessNumber } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.type !== 'user') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { country, visaType, notes } = body;

    if (!country || !visaType) {
      return NextResponse.json(
        { error: 'País e tipo de visto são obrigatórios' },
        { status: 400 }
      );
    }

    const processNumber = generateProcessNumber();

    const [process] = await db.insert(visaProcesses).values({
      userId: decoded.id,
      processNumber,
      country,
      visaType,
      notes,
      status: 'pending',
    }).returning();

    return NextResponse.json({
      message: 'Processo criado com sucesso',
      process,
    });
  } catch (error) {
    console.error('Erro ao criar processo:', error);
    return NextResponse.json(
      { error: 'Erro ao criar processo' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    let processes;

    if (decoded.type === 'admin') {
      processes = await db.select().from(visaProcesses).orderBy(visaProcesses.createdAt);
    } else {
      processes = await db.select()
        .from(visaProcesses)
        .where(eq(visaProcesses.userId, decoded.id))
        .orderBy(visaProcesses.createdAt);
    }

    return NextResponse.json({ processes });
  } catch (error) {
    console.error('Erro ao buscar processos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar processos' },
      { status: 500 }
    );
  }
}
