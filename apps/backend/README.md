# Locus Backend

Bun + Hono + PostgreSQL + PostGIS backend for the Locus location intelligence platform.

## Prerequisites

- [Bun](https://bun.sh) installed
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

## Setup Instructions

### 1. Install Bun (if not already installed)

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Install Dependencies

```bash
cd apps/backend
bun install
```

### 3. Start PostgreSQL + PostGIS

From the root directory:

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL 15 with PostGIS extension
- Create database `locus_dev`
- Run on port 5432
- Username: `locus`, Password: `locus123`

Verify it's running:
```bash
docker ps
```

### 4. Run Database Migration

```bash
cd apps/backend
bun run db:migrate
```

This will:
- Create the `locations` and `pois` tables
- Generate Prisma Client

### 5. Start the Development Server

```bash
bun run dev
```

Server will start on http://localhost:3000

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

Expected response: `{"status":"ok"}`

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run db:generate` - Generate Prisma Client
- `bun run db:migrate` - Run database migrations
- `bun run db:push` - Push schema changes without migration
- `bun run db:studio` - Open Prisma Studio (database GUI)

## Database Management

### View Database in Prisma Studio

```bash
bun run db:studio
```

Opens at http://localhost:5555

### Stop Database

```bash
docker-compose down
```

### Reset Database

```bash
docker-compose down -v  # Remove volumes
docker-compose up -d
bun run db:migrate
```

## Project Structure

```
apps/backend/
├── server.ts          # Hono server entry point
├── db/
│   └── connection.ts  # Prisma client instance
├── routes/            # API route handlers
├── services/          # Business logic
└── prisma/
    └── schema.prisma  # Database schema
```

## Next Steps

You can now build:
- Geocoding service (address → coordinates)
- OpenStreetMap integration
- Scoring algorithms
- API endpoints for location analysis
