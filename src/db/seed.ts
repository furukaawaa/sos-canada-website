/**
 * ============================================
 * Database Seed
 * ============================================
 * Popula dados iniciais: admin padrão + 8 aeroportos. Rode: npx tsx src/db/seed.ts
 */

import { db } from './index';
import { admins, airports } from './schema';
import { hashPassword } from '@/lib/auth';

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Criar admin padrão
    const hashedPassword = await hashPassword('admin123');
    
    await db.insert(admins).values([
      {
        name: 'Administrador',
        email: 'admin@soscanada.com.br',
        password: hashedPassword,
        role: 'super_admin',
      },
    ]).onConflictDoNothing();

    console.log('✅ Admin criado: admin@soscanada.com.br / admin123');

    // Criar aeroportos principais
    await db.insert(airports).values([
      {
        code: 'GRU',
        name: 'Aeroporto Internacional de São Paulo/Guarulhos',
        city: 'São Paulo',
        country: 'Brasil',
        latitude: '-23.432075',
        longitude: '-46.469511',
        featured: true,
      },
      {
        code: 'YYZ',
        name: 'Toronto Pearson International Airport',
        city: 'Toronto',
        country: 'Canadá',
        latitude: '43.677223',
        longitude: '-79.630556',
        featured: true,
      },
      {
        code: 'YVR',
        name: 'Vancouver International Airport',
        city: 'Vancouver',
        country: 'Canadá',
        latitude: '49.193889',
        longitude: '-123.184444',
        featured: true,
      },
      {
        code: 'JFK',
        name: 'John F. Kennedy International Airport',
        city: 'Nova York',
        country: 'Estados Unidos',
        latitude: '40.641766',
        longitude: '-73.780968',
        featured: true,
      },
      {
        code: 'LAX',
        name: 'Los Angeles International Airport',
        city: 'Los Angeles',
        country: 'Estados Unidos',
        latitude: '33.942536',
        longitude: '-118.408075',
        featured: true,
      },
      {
        code: 'LHR',
        name: 'London Heathrow Airport',
        city: 'Londres',
        country: 'Reino Unido',
        latitude: '51.470020',
        longitude: '-0.454295',
        featured: true,
      },
      {
        code: 'CDG',
        name: 'Charles de Gaulle Airport',
        city: 'Paris',
        country: 'França',
        latitude: '49.012779',
        longitude: '2.550000',
        featured: true,
      },
      {
        code: 'SYD',
        name: 'Sydney Kingsford Smith International Airport',
        city: 'Sydney',
        country: 'Austrália',
        latitude: '-33.946110',
        longitude: '151.177222',
        featured: true,
      },
    ]).onConflictDoNothing();

    console.log('✅ Aeroportos criados');

    console.log('🎉 Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  }
}

seed();
