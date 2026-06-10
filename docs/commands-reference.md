# 🛠 Commands Reference

# 📦 Project Structure

```text
microservices-todo-system/
│
├── backend/
├── frontend/
├── docs/
└── README.md
```

---

# 🐳 Docker Commands

# Start Backend + DynamoDB

```powershell
cd backend
docker compose up --build
```

Run in detached mode:

```powershell
docker compose up -d --build
```

---

# Stop Containers

```powershell
docker compose down
```

---

# View Running Containers

```powershell
docker ps
```

---

# View Container Logs

## Backend Logs

```powershell
docker logs microservices-backend
```

## DynamoDB Logs

```powershell
docker logs dynamodb-local
```

---

# Rebuild Containers

```powershell
docker compose up --build
```

---

# Remove Existing Containers

Used when container name conflicts occur.

```powershell
docker rm -f microservices-backend
docker rm -f dynamodb-local
```

---

# 🧹 Clean Environment

# Remove Containers

```powershell
docker compose down
```

---

# Remove Persistent Volume

```powershell
docker volume rm backend_dynamodb-data
```

This removes all persisted DynamoDB Local data.

---

# 🌐 Angular Frontend Commands

# Start Angular Development Server

```powershell
cd frontend
npm start
```

Alternative:

```powershell
ng serve
```

---

# Install Frontend Dependencies

```powershell
npm install
```

---

# Stop Angular Server

```text
Ctrl + C
```

---

# 🔍 Debugging Commands

# Check Port Usage (Windows)

## Backend Port

```powershell
netstat -ano | findstr :3040
```

## Angular Port

```powershell
netstat -ano | findstr :4200
```

## DynamoDB Port

```powershell
netstat -ano | findstr :8000
```

---

# Kill Process by PID

```powershell
taskkill /PID <PID> /F
```

---

# 🧪 API Testing

# GET Todos

```powershell
Invoke-RestMethod http://localhost:3040/api/todos
```

---

# POST Todo

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/todos" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test Todo","completed":false}'
```

---

# PUT Update Todo

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/todos/<ID>" `
  -Method PUT `
  -ContentType "application/json" `
  -Body '{"title":"Updated Todo","completed":true}'
```

---

# DELETE Todo

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/todos/<ID>" `
  -Method DELETE
```

---

# ❤️ Health Check

```powershell
Invoke-RestMethod http://localhost:3040/health
```

---

# 🔐 Authentication Testing

# Login Request

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"password"}'
```

---

# 🛠 Git Commands

# Check Status

```powershell
git status
```

---

# Add Changes

```powershell
git add .
```

---

# Commit Changes

```powershell
git commit -m "Update project documentation"
```

---

# Push Repository

```powershell
git push
```

---

# ⚠️ Common Issues

# Container Name Already Exists

Error:

```text
container name already in use
```

Solution:

```powershell
docker rm -f microservices-backend
docker rm -f dynamodb-local
```

---

# Port Already In Use

Solution:

```powershell
netstat -ano | findstr :3040
taskkill /PID <PID> /F
```

---

# DynamoDB Table Not Found

Handled automatically by backend startup logic.

Backend behavior:
- checks table existence
- creates table automatically if missing

---

# DynamoDB Not Ready During Startup

Handled automatically by retry synchronization logic.

---

# Angular Cannot Connect To Backend

Verify:

```ts
apiUrl: 'http://localhost:3040'
```

inside:

```text
frontend/src/environments/environment.ts
```

---

# HTTP 404 Errors

Use browser DevTools:

```text
F12 → Network Tab
```

Verify:
- Request URL
- Request Method
- HTTP Status Code

---

# TypeScript Strict Typing Errors

Use:

```ts
Partial<T>
```

for flexible update payload typing.

Example:

```ts
updateTodo(id: string, todo: Partial<Todo>)
```

---

# 📚 Useful URLs

# Angular Frontend

```text
http://localhost:4200
```

---

# Backend API

```text
http://localhost:3040
```

---

# DynamoDB Local

```text
http://localhost:8000
```
