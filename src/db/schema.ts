/**
 * ============================================
 * Database Schema — S.O.S Canadá & Mundo dos Vistos
 * ============================================
 *
 * Definição de todas as tabelas do PostgreSQL via Drizzle ORM.
 *
 * Relações:
 *   users 1 ──► N visa_processes
 *   users 1 ──► N consultations
 *   admins 1 ──► N visa_processes (assigned_to)
 */

import { pgTable, serial, varchar, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

/**
 * Clientes da plataforma.
 * Senhas são armazenadas com hash bcrypt (nunca em texto puro).
 */
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(), // bcrypt hash
  phone: varchar('phone', { length: 50 }),
  cpf: varchar('cpf', { length: 14 }), // formato: 000.000.000-00
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Equipe administrativa (consultores e gestores).
 * role: 'admin' | 'super_admin'
 */
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Processos de visto — entidade central do sistema.
 *
 * Status possíveis:
 *   pending | in_progress | approved | denied | completed
 *
 * `documents` guarda um array JSON com os documentos enviados.
 */
export const visaProcesses = pgTable('visa_processes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  processNumber: varchar('process_number', { length: 100 }).notNull().unique(),
  country: varchar('country', { length: 100 }).notNull(),
  visaType: varchar('visa_type', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  documents: jsonb('documents'),
  notes: text('notes'),
  assignedTo: integer('assigned_to').references(() => admins.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Consultas/agendamentos solicitados pelo formulário público.
 * `userId` é opcional — visitantes sem conta também podem solicitar.
 */
export const consultations = pgTable('consultations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  service: varchar('service', { length: 255 }).notNull(),
  country: varchar('country', { length: 100 }),
  message: text('message'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  scheduledDate: timestamp('scheduled_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Aeroportos exibidos no mapa interativo.
 * `code` = código IATA (ex: GRU, YYZ, JFK).
 * `featured` = exibir na página /airports.
 */
export const airports = pgTable('airports', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 10 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  latitude: varchar('latitude', { length: 50 }),
  longitude: varchar('longitude', { length: 50 }),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Depoimentos de clientes (aprovados pelo admin antes de exibição).
 */
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  rating: integer('rating').notNull(), // 1–5
  comment: text('comment').notNull(),
  service: varchar('service', { length: 255 }),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// Types — use estes em vez de `any`
// ============================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
export type VisaProcess = typeof visaProcesses.$inferSelect;
export type NewVisaProcess = typeof visaProcesses.$inferInsert;
export type Consultation = typeof consultations.$inferSelect;
export type NewConsultation = typeof consultations.$inferInsert;
export type Airport = typeof airports.$inferSelect;
export type NewAirport = typeof airports.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
