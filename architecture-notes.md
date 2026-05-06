# 🧠 Architecture Notes

## 📦 System Overview

This project implements a **containerized microservices backend** using:

* Node.js (Express API)
* Docker & Docker Compose
* DynamoDB Local (AWS simulation)

---

## 🏗 Architecture Flow

```
Frontend (Angular)
        ↓
Backend API (Express)
        ↓
DynamoDB Local (Docker container)
```

---

## 🔗 Service Communication

* Backend connects to DynamoDB using:

  ```
  http://dynamodb-local:8000
  ```
* Uses Docker internal DNS (service name resolution)

---

## 💾 Persistence Strategy

* DynamoDB Local uses Docker volume:

```
dynamodb-data → /home/dynamodblocal/data
```

* Ensures:

  * Data persists across restarts
  * No data loss during development

---

## ⚙️ Startup Sequence

1. Docker Compose starts containers
2. DynamoDB initializes
3. Backend starts
4. Backend runs:

```
ensureTodosTable()
```

5. Logic:

   * Check if table exists
   * If not → create table
   * Retry if DynamoDB not ready

---

## 🔁 Resilience Features

### Retry Logic

* Backend retries connection to DynamoDB
* Prevents crash during startup race conditions

### Auto Table Creation

* Removes manual AWS CLI dependency
* Ensures consistent environment

---

## 🌐 Environment Configuration

Uses environment variables:

```
DYNAMODB_ENDPOINT
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

---

## 🐳 Container Design

### Backend

* Built from Dockerfile
* Runs Express server on port 3000

### DynamoDB Local

* Official AWS image
* SQLite-based internal storage
* Runs on port 8000

---

## ⚠️ Key Challenges Solved

* Container networking (service-to-service)
* Volume permission issues (SQLite)
* Port conflicts
* Missing database schema
* Startup timing issues
* AWS CLI absence in local environment

---

## 🚀 Future Enhancements

* Replace DynamoDB Local with AWS DynamoDB
* Deploy backend to AWS (ECS / EC2)
* Introduce API Gateway
* Split into multiple microservices (auth / todo)
* Add CI/CD pipeline
