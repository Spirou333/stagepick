# Stagepick

## Dev Environment
```bash
podman run -it --userns=keep-id -v ./:/app docker.io/oven/bun:1 /bin/bash

podman network create stagepick

podman run -it --name stagepick-backend -p 8081:8081 --network stagepick -v ./backend:/app /bin/bash
podman run -it --name stagepick-frontend -p 8080:8080 --network stagepick -v ./frontend:/app /bin/bash

mkdir tmp/database
podman run --name stagepick-database -p 5432:5432 --network stagepick -e POSTGRES_PASSWORD= -e POSTGRES_DB=stagepick -v ./tmp/database:/ docker.io/postgres:18.4
```

## Initial Setup
**Backend**
```bash
bun init stagepick-backend
bun add express
```
Blank

**Frontend**
```bash
bun create vite stagepick-frontend --template react-ts
```
ESLint

