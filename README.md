# Waapikuu Wedding Invitation

## Menjalankan Lokal

Pastikan Bun sudah terpasang(atau package manager yg lain bebas), lalu jalankan:

```bash
bun install 
bun dev
```

Buka [http://localhost:3000](http://localhost:3000).

Untuk memeriksa project:

```bash
bunx tsc --noEmit
bun run lint
bun run build
```

## Environment dan Database

Buat file `.env` di root project:

```env
TURSO_CONNECTION_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-token
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAIL=admin@example.com
BETTER_AUTH_SECRET=xxxxxxxxxx
BETTER_AUTH_URL=http://localhost:3000
```

Push schema ke database Turso:

```bash
bunx drizzle-kit push
```

Google OAuth callback untuk production:

```text
http://localhost:3000/api/auth/callback/google
```

Admin dashboard:




## Disclosure AI

Project ini dibuat dengan bantuan OpenAI Codex sebagai AI coding agent
