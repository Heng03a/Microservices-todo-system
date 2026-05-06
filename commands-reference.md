# 🛠 Commands Reference

## 🐳 Docker Commands

### Start services

```bash
docker compose up -d --build
```

### Stop services

```bash
docker compose down
```

### View running containers

```bash
docker ps
```

### View logs

```bash
docker logs microservices-backend
docker logs dynamodb-local
```

---

## 🔁 Rebuild backend

```bash
docker compose up -d --build
```

---

## 🧹 Clean environment

Remove containers + volume:

```bash
docker compose down
docker volume rm microservices-backend_dynamodb-data
```

---

## 🔍 Debugging

### Check port usage (Windows)

```powershell
netstat -ano | findstr :3040
```

### Kill process

```powershell
taskkill /PID <PID> /F
```

---

## 🧪 API Testing

### GET todos

```powershell
Invoke-RestMethod http://localhost:3040/api/todos
```

### POST todo

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/todos" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test","completed":false}'
```

---

## ❤️ Health Check

```powershell
Invoke-RestMethod http://localhost:3040/health
```

---

## ⚠️ Common Issues

### Port already in use

Solution:

```bash
docker rm -f <container_name>
```

---

### Table not found

Handled automatically by backend (auto-create logic)

---

### DynamoDB not ready

Handled by retry logic in backend startup
