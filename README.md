# Kisan Saathi - Government Scheme Eligibility Navigator

Kisan Saathi helps Indian farmers discover which central and state government agricultural schemes they qualify for, by answering 5 simple questions.

## Problem Statement
Many small and marginal farmers remain unaware of government schemes or struggle with complex eligibility criteria. This leads to underutilization of subsidies, crop insurance, and loans.

## Solution
Kisan Saathi addresses this by offering a lightweight, offline-capable (PWA), multi-lingual application. Users input minimal details (State, Crop, Land size, Income, Ownership) and the system cross-matches this against a database of active schemes.

## Tech Stack
| Tier     | Tech       |
|----------|------------|
| Frontend | React 18, Vite, Tailwind CSS, shadcn/ui styles, Zustand, i18next, PWA |
| Backend  | Node.js, Express, REST API, Zod, express-rate-limit |
| Database | PostgreSQL, Prisma ORM |
| Infra    | Docker, docker-compose |

## Screenshots
> *(Screenshots placeholder)*

## Setup Instructions

### 1. Prerequisites
- Docker and Docker Compose
- Node.js (v20)
- npm

### 2. Quick Start (Docker)
1. Clone the repository
2. Run `docker-compose up -d` to start the PostgreSQL database, Backend API, and Frontend Vite server.
3. Once running, access the frontend at `http://localhost:5173`

### 3. Manual Steps (Database Seed)
To seed the database with all 10 schemes:
```bash
cd backend
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Run frontend manually:
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

### POST `/api/eligibility/check`
Checks eligibility based on farmer profile.
**Request Body:**
```json
{
  "state": "Maharashtra",
  "cropType": "Wheat",
  "landSize": 2.5,
  "annualIncome": 50000,
  "landOwnership": "Owned"
}
```

### GET `/api/schemes`
Returns paginated active schemes.

### GET `/api/schemes/:id`
Returns full scheme details including documents and application steps.

### GET `/api/schemes/search?q=pmkisan`
Search schemes by name.

### GET `/api/analytics/summary`
Returns usage analytics.

## Deployment Guide
- **Frontend (Vercel)**: Import `frontend` directory. Add `VITE_API_URL` environment variable pointing to the production backend.
- **Backend (Railway/Render)**: Add `DATABASE_URL` (PostgreSQL), `FRONTEND_URL` mapped to deployed frontend. Make sure to run `npx prisma db push` as the build/start step.

## Team
- **[Team Name Placeholder]** - Smart India Hackathon

## License
MIT
