## 🐳 Docker Setup (Backend + DynamoDB)

This project uses **Docker Compose** to orchestrate the backend service and DynamoDB Local.

### 🔧 Services

* **Backend**: Node.js + Express (port `3040`)
* **DynamoDB Local**: Local AWS DynamoDB simulation (port `8000`)
* **Persistent Volume**: Ensures data is retained across container restarts

---

### 🚀 Start the system

```bash
docker compose up -d --build
```

This will:

* Build backend image
* Start DynamoDB Local
* Automatically create the `Todos` table (if not exists)
* Start backend API

---

### 🔍 Verify services

Check running containers:

```bash
docker ps
```

---

### 🧪 Test API

```bash
GET http://localhost:3040/api/todos
```

Using PowerShell:

```powershell
Invoke-RestMethod http://localhost:3040/api/todos
```

---

### ➕ Create Todo

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/todos" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test Todo","completed":false}'
```

---

### ❤️ Health Check

```bash
GET http://localhost:3040/health
```

---

### 🧠 Key Features

* Containerized backend and database
* Service-to-service networking via Docker DNS
* DynamoDB Local with persistent volume
* Auto table creation on startup
* Retry logic for service readiness
* Clean one-command startup

---

### 🛑 Stop system

```bash
docker compose down
```

---

### 🧹 Full reset (including data)

```bash
docker compose down
docker volume rm microservices-backend_dynamodb-data
```

### AWS DynamoDB Integration

The backend was upgraded from DynamoDB Local running in Docker to real AWS DynamoDB in the `ap-southeast-1` region.

The Node.js Express API uses AWS SDK v3 to perform CRUD operations against a cloud-hosted DynamoDB table named `Todos`.

Architecture:

Angular Frontend → Node.js/Express API → AWS SDK v3 → AWS DynamoDB

