/**
 * ============================================
 * Authentication Utilities
 * ============================================
 *
 * Gerencia hash de senhas (bcrypt) e tokens JWT (jose).
 *
 * Fluxo:
 *   1. Register → hashPassword() → salva no banco
 *   2. Login → comparePassword() → createToken()
 *   3. Requests protegidos → verifyToken()
 *
 * ⚠️ Defina JWT_SECRET no .env em produção!
 *    Gere com: openssl rand -base64 32
 */

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

/** Chave secreta para assinar/verificar tokens JWT */
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

/** Tempo de expiração do token (7 dias) */
const TOKEN_EXPIRATION = '7d';

/** Payload contido em cada token */
export interface TokenPayload {
  id: number;
  email: string;
  type: 'user' | 'admin';
}

/**
 * Gera hash bcrypt da senha (10 rounds de salt).
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compara senha em texto puro com o hash armazenado.
 * Retorna true se bater.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Cria um token JWT assinado contendo id/email/type.
 * Expira em 7 dias.
 */
export async function createToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(JWT_SECRET);
}

/**
 * Verifica e decodifica um token JWT.
 * Retorna o payload ou null se inválido/expirado.
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null; // token inválido ou expirado
  }
}
