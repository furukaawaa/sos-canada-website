/**
 * ============================================
 * GET/PATCH /api/visa-processes/:id
 * ============================================
 * GET: detalhes do processo (dono ou admin). PATCH: atualiza status (admin only).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visaProcesses } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const [process] = await db.select()
      .from(visaProcesses)
      .where(eq(visaProcesses.id, parseInt(id)))
      .limit(1);

    if (!process) {
      return NextResponse.json({ error: 'Processo não encontrado' }, { status: 404 });
    }

    // Verificar se o usuário tem permissão
    if (decoded.type === 'user' && process.userId !== decoded.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });
    }

    return NextResponse.json({ process });
  } catch (error) {
    console.error('Erro ao buscar processo:', error);
    return NextResponse.json({ error: 'Erro ao buscar processo' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.type !== 'admin') {
      return NextResponse.json({ error: 'Apenas administradores podem atualizar processos' }, { status: 403 });
    }

    const body = await request.json();
    const { status, notes, assignedTo } = body;

    const [updatedProcess] = await db.update(visaProcesses)
      .set({
        status,
        notes,
        assignedTo,
        updatedAt: new Date(),
      })
      .where(eq(visaProcesses.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Processo atualizado com sucesso',
      process: updatedProcess,
    });
  } catch (error) {
    console.error('Erro ao atualizar processo:', error);
    return NextResponse.json({ error: 'Erro ao atualizar processo' }, { status: 500 });
  }
}
