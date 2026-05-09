# Backend - Cloud-Native Serverless Todo System

This backend project demonstrates distributed backend engineering using Node.js, Express.js, AWS Lambda, AWS API Gateway, DynamoDB, Docker, and RESTful API architecture principles.

The backend supports both:

- Local Dockerized development environment
- AWS cloud-native serverless architecture

---

# Overview

The backend architecture consists of:

- Express.js REST API backend
- AWS Lambda serverless functions
- AWS API Gateway integrations
- DynamoDB NoSQL persistence
- Dockerized local infrastructure
- JWT authentication flow
- AWS SDK v3 integration

This project demonstrates modern backend engineering concepts including event-driven architecture, serverless computing, distributed systems design, and stateless cloud-native services.

---

# Backend Architecture

## Local Development Architecture

```text
Angular Frontend
        ↓
Express.js Backend
        ↓
AWS SDK v3
        ↓
DynamoDB Local (Docker)
```

---

## AWS Serverless Architecture

```text
Angular Frontend
        ↓
AWS API Gateway
        ↓
AWS Lambda Functions
        ↓
Amazon DynamoDB
```

---

# Technologies Used

## Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- AWS SDK v3

## AWS Cloud Services
- AWS Lambda
- AWS API Gateway
- Amazon DynamoDB

## Infrastructure
- Docker
- Docker Compose
- DynamoDB Local

---

# Backend Features

## RESTful APIs
- Create todo
- Retrieve todos
- Update todo
- Delete todo

## Serverless APIs
- AWS Lambda CRUD functions
- API Gateway routing integrations
- Event-driven architecture
- Stateless backend services

## Authentication
- JWT login authentication
- Protected API routes
- Angular HTTP interceptor integration

## Infrastructure
- Dockerized local backend
- DynamoDB Local container
- Persistent Docker volume
- Retry startup synchronization
- Automatic DynamoDB table initialization

---

# Express.js REST API Endpoints

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

# AWS Serverless API Endpoints

## Lambda CRUD APIs

```http
GET    /api/todos-lambda
POST   /api/todos-lambda
PUT    /api/todos-lambda/{id}
DELETE /api/todos-lambda/{id}
```

---

# AWS Lambda Functions

## Implemented Functions

```text
getTodosLambda
createTodoLambda
updateTodoLambda
deleteTodoLambda
```

Each Lambda function is integrated with:

- API Gateway routes
- DynamoDB operations
- JSON request/response handling
- CORS configuration
- Event-driven execution

---

# DynamoDB Integration

The backend integrates with:

- DynamoDB Local (development)
- AWS DynamoDB Cloud (serverless architecture)

The backend includes:

- automatic table existence checking
- retry startup synchronization
- automatic table creation if missing
- AWS SDK v3 integration
- UUID entity generation

---

# Project Structure

```text
backend/
│
├── routes/
│   ├── auth.routes.js
│   └── todo.routes.js
│
├── middleware/
│
├── aws-serverless-backend/
│   └── lambdas/
│       ├── getTodos/
│       ├── createTodo/
│       ├── updateTodo/
│       └── deleteTodo/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
└── README.md
```

---

# Local Development Setup

## Start Docker Services

```powershell
docker compose up --build
```

---

## Stop Containers

```powershell
docker compose down
```

---

# Local Backend API

Runs on:

```text
http://localhost:3040
```

---

# AWS API Gateway Endpoint

Example:

```text
https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com
```

---

# Local Backend Testing

## Get Todos

```powershell
Invoke-RestMethod http://localhost:3040/api/todos
```

---

## Create Todo

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3040/api/todos" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Local backend test","completed":false}'
```

---

# AWS Serverless API Testing

## Get Todos

```powershell
Invoke-RestMethod https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/api/todos-lambda
```

---

## Create Todo

```powershell
Invoke-RestMethod `
  -Uri "https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/api/todos-lambda" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Lambda test","completed":false}'
```

---

# Engineering Concepts Demonstrated

- Serverless computing
- Event-driven architecture
- Stateless backend design
- Distributed cloud systems
- API Gateway routing architecture
- RESTful API design
- NoSQL database integration
- AWS managed services integration
- Dockerized infrastructure
- Environment-based configuration
- Backend/frontend separation
- Cloud-native backend engineering

---

# Engineering Challenges Solved

## Docker Synchronization
Implemented retry logic for delayed DynamoDB Local startup readiness.

## API Gateway Routing
Configured distributed REST API routing using AWS API Gateway.

## Lambda Integration
Integrated AWS Lambda functions with DynamoDB CRUD operations.

## DynamoDB Operations
Implemented Create, Read, Update, Delete operations using AWS SDK v3.

## Distributed Backend Architecture
Designed backend supporting both local Docker infrastructure and cloud-native serverless deployment.

## Stateless Service Design
Built event-driven backend services without persistent server dependency.

---

# Future Improvements

Planned enhancements:

- JWT authorization for Lambda APIs
- CloudWatch centralized logging
- Infrastructure as Code (Terraform / AWS SAM)
- CI/CD deployment pipelines
- Kubernetes orchestration
- Service-to-service communication
- Dedicated authentication microservice
- Role-based authorization
- Production monitoring and tracing

---

# Author

Phua Kia Heng

Full-Stack Web Application Developer

Technologies:

Node.js • Express • AWS Lambda • API Gateway • DynamoDB • Docker • REST APIs • JWT • AWS SDK • Serverless Architecture
