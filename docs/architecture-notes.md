# 🧠 Architecture Notes

# 📦 System Overview

This project implements a distributed full-stack web application using:

- Angular frontend SPA
- Node.js Express backend API
- Dockerized backend infrastructure
- DynamoDB Local database
- AWS SDK v3 integration
- JWT-based authentication flow

The architecture was designed to simulate a modern microservice-ready environment while maintaining a stable modular backend during development.

---

# 🏗 High-Level Architecture

```text
Angular Frontend (localhost:4200)
        ↓
REST API Communication
        ↓
Node.js Express Backend (Docker Container)
        ↓
AWS SDK v3
        ↓
DynamoDB Local (Docker Container)
```

---

# 📂 Current System Structure

```text
microservices-todo-system/
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── server.js
│
├── frontend/
│
├── docs/
│
├── api-gateway/
├── auth-service/
├── _archive-todo-service/
```

---

# 🔗 Frontend-Backend Communication

The Angular frontend communicates with the backend using REST APIs through Angular HttpClient.

Environment configuration:

```ts
apiUrl: 'http://localhost:3040'
```

Frontend and backend run on separate ports:

| Service | Port |
|---|---|
| Angular Frontend | 4200 |
| Backend API | 3040 |
| DynamoDB Local | 8000 |

This simulates a distributed deployment architecture similar to production systems.

---

# 🔐 Authentication Flow

The application uses JWT token authentication.

Authentication sequence:

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT token generated
    ↓
Token stored in frontend
    ↓
Angular interceptor attaches token
    ↓
Protected API access
```

This demonstrates stateless authentication commonly used in distributed systems and microservice architectures.

---

# 🐳 Docker Architecture

Docker Compose orchestrates:

- Backend container
- DynamoDB Local container

The backend service communicates with DynamoDB using Docker internal networking.

Internal endpoint:

```text
http://dynamodb-local:8000
```

Docker service-name DNS resolution allows container-to-container communication without hardcoded IP addresses.

---

# 💾 Persistence Strategy

DynamoDB Local uses a persistent Docker volume:

```text
dynamodb-data → /home/dynamodblocal/data
```

Benefits:

- Data survives container restarts
- Stable local development environment
- Simulates persistent cloud database behavior

---

# ⚙️ Backend Startup Sequence

Application startup flow:

```text
1. Docker Compose starts containers
2. DynamoDB container initializes
3. Backend container starts
4. Backend checks database readiness
5. Backend validates table existence
6. Backend creates table if missing
7. Express server becomes available
```

Backend initialization includes:

```js
ensureTodosTable()
```

This improves reliability during container startup synchronization.

---

# 🔁 Resilience Features

# Retry Logic

The backend includes retry logic during startup:

```text
Retry DynamoDB connection until available
```

Purpose:

- Prevent backend crashes
- Handle asynchronous container startup timing
- Improve Docker reliability

---

# Auto Table Creation

The backend automatically:

- checks table existence
- creates table if missing

Benefits:

- removes manual AWS CLI dependency
- improves onboarding simplicity
- ensures consistent development environments

---

# 🌐 Environment Configuration

Environment variables are used for infrastructure configuration:

```text
DYNAMODB_ENDPOINT
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

This follows cloud-native configuration practices.

---

# 🧩 API Design

RESTful API endpoints:

## Authentication

```http
POST /api/auth/login
```

## Todos

```http
GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id
```

---

# 🛠 Engineering Challenges Solved

## Docker Container Synchronization

Problem:
Backend started before DynamoDB became available.

Solution:
Implemented retry-based startup synchronization.

---

## Container Networking

Problem:
Service-to-service communication between containers.

Solution:
Used Docker internal DNS service resolution.

---

## Persistent Local Database

Problem:
Database reset after container restart.

Solution:
Configured Docker persistent volume.

---

## Frontend-Backend Endpoint Mismatch

Problem:
Incorrect REST endpoint configuration caused HTTP 404 errors.

Solution:
Validated API requests using browser DevTools Network inspection.

---

## TypeScript Strict Typing

Problem:
Update payloads failed strict interface validation.

Solution:
Implemented:

```ts
Partial<Todo>
```

for flexible update payload typing.

---

# 🚀 Future Architecture Evolution

Planned enhancements:

## Infrastructure
- AWS DynamoDB cloud migration
- ECS / EC2 deployment
- Kubernetes orchestration
- CI/CD pipelines

## Microservices
- API Gateway
- Dedicated auth-service
- Dedicated todo-service
- Service-to-service communication

## Security
- Role-based authorization
- Token refresh flow
- HTTPS/TLS deployment

---

# 📚 Architectural Design Goals

The project was designed to demonstrate:

- distributed frontend/backend separation
- Dockerized infrastructure
- cloud-ready configuration
- REST API design
- container orchestration
- persistent NoSQL storage
- scalable microservice preparation
- modern TypeScript frontend integration
