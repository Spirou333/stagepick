# Stagepick
Stagepick is a opensource software that focuses on allowing conventions or events to have DJs send in applications with their demos online, get them rated by judges and have a UI that allows the DJs to see the current state of their application.

Due to many conventions not having a proper solution and a certain virtual convention that doesn't want to share this with the community, I've decided to create this as a passion project to offer a better solution that is free to use for anyone.

## Dev Environment
Environment with OS user to generate files during development
```bash
podman run -it --userns=keep-id -v ./:/app docker.io/oven/bun:1 /bin/bash
```

Setup of seperate network to access local database
```bash
podman network create stagepick
```

Start Backend
```bash
podman run -it --name stagepick-backend -p 8081:8081 --network stagepick -v ./backend:/app /bin/bash
bun add -d @types/express
bun run dev
```

Start Frontend
```bash
podman run -it --name stagepick-frontend -p 8080:8080 --network stagepick -v ./frontend:/app /bin/bash
bunx --bun vite
```

Start Database
```bash
mkdir tmp/database
podman run --name stagepick-database -p 5432:5432 --network stagepick -e POSTGRES_PASSWORD= -e POSTGRES_DB=stagepick -v ./tmp/database:/ docker.io/postgres:18.4
```

## Initial Setup
**Backend**
```bash
bun init backend
bun add express
```
Options:
- Blank

**Frontend**
```bash
bun create vite frontend --template react-ts
```
Options:
- ESLint

