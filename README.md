# Microservices Todo System

A full-stack distributed web application built using Angular, Node.js, Express, Docker, and DynamoDB Local.

This project demonstrates modern frontend-backend separation, containerized backend infrastructure, REST API communication, AWS SDK integration, and microservice-ready architecture preparation.

---

# Overview

The system consists of:

- Angular frontend SPA
- Node.js Express backend API
- Dockerized backend environment
- DynamoDB Local database
- JWT authentication flow
- RESTful CRUD operations

The project was designed to simulate a modern distributed application architecture while preparing for future migration into fully separated microservices.

---

# Architecture

```text
Angular Frontend (localhost:4200)
        ↓
REST API Communication
        ↓
Node.js Express Backend (Docker Container)
        ↓
AWS SDK v3
        ↓
DynamoDB Local (Docker Container + Persistent Volume)
```

---

# Technologies Used

## Frontend
- Angular
- TypeScript
- RxJS
- Angular HttpClient
- Responsive CSS

## Backend
- Node.js
- Express.js
- JWT Authentication
- AWS SDK v3
- REST APIs

## Infrastructure
- Docker
- Docker Compose
- DynamoDB Local

---

# Features

## Authentication
- JWT login authentication
- Token-based API access
- Angular HTTP interceptor integration

## Todo Management
- Create task
- Update task
- Mark task completed
- Delete task
- Persistent data storage

## Infrastructure
- Dockerized backend service
- DynamoDB Local container
- Persistent Docker volume
- Retry logic for database startup synchronization

---

# Project Structure

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
│   ├── src/
│   └── angular.json
│
├── db/
│
├── docs/
│   ├── architecture-notes.md
│   └── commands-reference.md
│
├── api-gateway/
├── auth-service/
├── _archive-todo-service/
│
└── README.md
```

---

# Docker Setup

## Start Backend + DynamoDB

```powershell
cd backend
docker compose up --build
```

## Stop Containers

```powershell
docker compose down
```

---

# Frontend Setup

## Start Angular Frontend

```powershell
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:4200
```

Backend API runs on:

```text
http://localhost:3040
```

---

# API Endpoints

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

# DynamoDB Integration

The backend uses AWS SDK v3 with DynamoDB Local running inside Docker.

The application includes:
- automatic table existence checking
- retry startup synchronization
- automatic table creation if missing

This improves startup reliability when containers initialize asynchronously.

---

# Frontend-Backend Communication

The Angular frontend communicates with the backend using REST APIs through Angular HttpClient.

Environment-based API configuration is used:

```ts
apiUrl: 'http://localhost:3040'
```

JWT tokens are automatically attached using Angular HTTP interceptors.

---

# Engineering Challenges Solved

## Docker Container Synchronization
Implemented retry logic to handle delayed DynamoDB container readiness during startup.

## Frontend-Backend Port Separation
Configured distributed frontend/backend communication using separate ports and environment-based configuration.

## TypeScript Strict Typing
Resolved strict typing issues using Partial<T> for update payload flexibility.

## REST Endpoint Debugging
Used browser DevTools Network inspection to diagnose and resolve HTTP 404 endpoint mismatches.

---

# Future Improvements

Planned future enhancements:

- API Gateway service
- Dedicated auth-service
- Service-to-service communication
- AWS cloud deployment
- DynamoDB cloud integration
- Kubernetes orchestration
- CI/CD pipelines

---

# Documentation

Additional documentation:

- docs/architecture-notes.md
- docs/commands-reference.md

---

# Author

Phua Kia Heng

Full-Stack Web Application Developer

Technologies:
Angular • Node.js • Express • Docker • DynamoDB • REST APIs • JWT • AWS SDK
