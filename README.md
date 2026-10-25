# 🍁 S.O.S Canadá & Mundo dos Vistos

> Plataforma completa de assessoria de vistos — sistema SaaS com autenticação, dashboards, mapa interativo de aeroportos e consulta de voos.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat&logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Features

### 👤 Cliente
- 🔐 Registro e login seguro (JWT + bcrypt)
- 📊 Dashboard pessoal com estatísticas do processo
- 📄 Criação e acompanhamento de processos de visto
- 📅 Agendamento de consultas online

### 🛡️ Administrativo
- 📈 Painel com métricas em tempo real
- 🗂️ Gestão completa de processos e consultas
- 🏷️ Controle de status e atribuições

### 🌍 Extras
- ✈️ Consulta de voos em tempo real (AviationStack + fallback mock)
- 🗺️ Mapa interativo de aeroportos (Leaflet + OpenStreetMap)
- 💫 Animações suaves (Framer Motion)
- 📱 100% responsivo

## 🚀 Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sos-canada.git
cd sos-canada

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env
# Edite .env com suas credenciais (banco + JWT secret)

# 4. Crie as tabelas no banco
npx drizzle-kit push

# 5. Popule com dados iniciais (admin + aeroportos)
npx tsx src/db/seed.ts

# 6. Rode o projeto
npm run dev
```

Acesse: **http://localhost:3000**

### 🔑 Credenciais padrão (após o seed)

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | `admin@soscanada.com.br` | `admin123` |

> ⚠️ **Mude essas credenciais antes de ir para produção!**

## 🏗️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Banco | PostgreSQL + Drizzle ORM |
| Estilo | Tailwind CSS 4 |
| Animações | Framer Motion |
| Mapas | Leaflet |
| Auth | JWT (jose) + bcryptjs |

## 📁 Estrutura

```
src/
├── app/                  # Rotas (App Router)
│   ├── api/             # API Routes (auth, processos, voos...)
│   ├── dashboard/       # Área do cliente
│   ├── admin/           # Área administrativa
│   ├── services/        # Catálogo de serviços
│   ├── flights/         # Voos em tempo real
│   ├── airports/        # Mapa de aeroportos
│   └── ...
├── components/          # Componentes React
│   └── ui/              # Design system (Button, Card, Input)
├── db/                  # Database
│   ├── schema.ts        # Tabelas (Drizzle)
│   ├── index.ts         # Conexão
│   └── seed.ts          # Dados iniciais
└── lib/                 # Utilitários
    ├── auth.ts          # JWT + hash
    └── utils.ts         # Helpers
```

## 🗄️ Database Schema

- `users` — clientes
- `admins` — equipe administrativa
- `visa_processes` — processos de visto
- `consultations` — consultas agendadas
- `airports` — aeroportos (com lat/lng)
- `testimonials` — depoimentos

## 🔧 Scripts

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run start      # Production server
npx drizzle-kit push   # Sync schema → database
npx tsx src/db/seed.ts # Seed demo data
```

## 🚢 Deploy

Compatível com Vercel, Railway, Render, Docker.

```bash
# Vercel (recomendado)
npm i -g vercel
vercel
```

Não esqueça de configurar as env vars: `DATABASE_URL`, `JWT_SECRET` e `AVIATION_API_KEY` (opcional).

## 📄 Licença

MIT — ver [LICENSE](LICENSE)

---

Feito com ❤️ para **S.O.S Canadá & Mundo dos Vistos**
