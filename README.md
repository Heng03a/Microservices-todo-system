
# Cloud-Native Serverless Todo System

A distributed full-stack web application built using Angular, Node.js, AWS API Gateway, AWS Lambda, DynamoDB, Docker, and RESTful microservices architecture principles.

This project demonstrates cloud-native backend engineering, serverless computing, distributed frontend/backend communication, event-driven architecture, NoSQL database integration, and scalable REST API design on AWS.

---

# Overview

The system consists of:

- Angular frontend SPA
- AWS API Gateway
- AWS Lambda serverless backend functions
- DynamoDB NoSQL database
- Dockerized development environment
- JWT authentication flow
- RESTful CRUD APIs
- Distributed cloud architecture

The project was designed to simulate modern cloud-native backend architecture while demonstrating serverless engineering concepts using AWS managed services.

---

# Architecture

Angular Frontend
        ↓
AWS API Gateway
        ↓
AWS Lambda Functions
        ↓
Amazon DynamoDB

---

# Serverless API Architecture

The backend uses fully serverless REST APIs powered by AWS Lambda and API Gateway.

Implemented serverless endpoints:

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/api/todos-lambda`      | Retrieve all todos   |
| POST   | `/api/todos-lambda`      | Create new todo      |
| PUT    | `/api/todos-lambda/{id}` | Update existing todo |
| DELETE | `/api/todos-lambda/{id}` | Delete todo          |

The serverless backend architecture demonstrates:

* Event-driven computing
* Stateless backend services
* Managed cloud infrastructure
* Distributed API routing
* Scalable RESTful backend design

---

# Technologies Used

## Frontend

* Angular
* TypeScript
* RxJS
* Angular HttpClient
* Responsive CSS

## Backend / Cloud

* Node.js
* Express.js
* AWS Lambda
* AWS API Gateway
* Amazon DynamoDB
* AWS SDK v3
* REST APIs
* JWT Authentication

## Infrastructure / DevOps

* Docker
* Docker Compose
* DynamoDB Local
* Git
* GitHub

---

# Features

## Serverless Backend

* AWS Lambda CRUD functions
* API Gateway integrations
* Event-driven REST APIs
* Stateless backend architecture
* Distributed API routing

## Authentication

* JWT login authentication
* Token-based API access
* Angular HTTP interceptor integration

## Todo Management

* Create task
* Update task
* Mark task completed
* Delete task
* Persistent DynamoDB storage

## Infrastructure

* Dockerized local development environment
* DynamoDB Local container
* Persistent Docker volume
* Retry logic for database startup synchronization
* AWS cloud deployment architecture

---

# Project Structure

microservices-todo-system/
│
├── aws-serverless-backend/
│   └── lambdas/
│       ├── getTodos/
│       ├── createTodo/
│       ├── updateTodo/
│       └── deleteTodo/
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
├── docs/
│   ├── architecture-notes.md
│   └── commands-reference.md
│
├── api-gateway/
├── auth-service/
├── _archive-todo-service/
│
└── README.md

---

# AWS Serverless Components

## AWS API Gateway

Used as the public HTTPS API routing layer for Lambda integrations.

Responsibilities:

* API routing
* HTTPS endpoint exposure
* Request forwarding
* Lambda integrations
* Distributed API management

## AWS Lambda

Implemented event-driven serverless functions for CRUD operations.

Benefits:

* Stateless execution
* Auto scaling
* Managed infrastructure
* Pay-per-request architecture
* No persistent server management required

## Amazon DynamoDB

Used as the cloud-native NoSQL persistence layer.

Features:

* Fully managed AWS database
* High scalability
* Flexible schema design
* Fast key-value access patterns

---

# Local Docker Development Setup

## Start Backend + DynamoDB Local

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

Local backend API runs on:

```text
http://localhost:3040
```

AWS API Gateway endpoint example:

```text
https://xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com
```

---

# REST API Endpoints

## Authentication

```http
POST /api/auth/login
```

## Local Backend APIs

```http
GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id
```

## AWS Serverless APIs

```http
GET    /api/todos-lambda
POST   /api/todos-lambda
PUT    /api/todos-lambda/{id}
DELETE /api/todos-lambda/{id}
```

---

# DynamoDB Integration

The application integrates with both:

* DynamoDB Local (Dockerized local development)
* AWS Cloud DynamoDB (production-style serverless architecture)

The backend includes:

* automatic table existence checking
* retry startup synchronization
* automatic table creation if missing

This improves startup reliability when services initialize asynchronously.

---

# Frontend-Backend Communication

The Angular frontend communicates with backend services using REST APIs through Angular HttpClient.

Environment-based API configuration is used:

```ts
apiUrl: 'http://localhost:3040'
```

or AWS API Gateway endpoints for serverless deployment.

JWT tokens are automatically attached using Angular HTTP interceptors.

---

# Engineering Concepts Demonstrated

* Serverless computing
* Event-driven architecture
* Cloud-native backend engineering
* Distributed systems architecture
* Stateless backend services
* RESTful API design
* NoSQL database integration
* API Gateway routing architecture
* AWS managed services integration
* Microservices-oriented architecture
* Frontend/backend separation
* Dockerized infrastructure
* Environment-based configuration
* Cross-origin frontend/backend communication

---

# Engineering Challenges Solved

## Docker Container Synchronization

Implemented retry logic to handle delayed DynamoDB container readiness during startup.

## Distributed Frontend-Backend Communication

Configured frontend/backend communication across separate services and cloud infrastructure.

## Serverless API Integration

Integrated API Gateway routes with AWS Lambda event-driven functions.

## DynamoDB CRUD Operations

Implemented distributed CRUD APIs using AWS SDK v3 and DynamoDB.

## REST Endpoint Debugging

Diagnosed and resolved API Gateway route mismatches and Lambda integration issues.

## Stateless Backend Design

Designed scalable serverless backend services without persistent server dependency.

---

# Future Improvements

Planned future enhancements:

* JWT authorization for Lambda APIs
* CloudWatch centralized logging
* Infrastructure as Code (Terraform / AWS SAM)
* CI/CD deployment pipelines
* Kubernetes orchestration
* Dedicated auth-service architecture
* Service-to-service communication
* Role-based authorization
* Production-grade monitoring and tracing

---

# Documentation

Additional documentation:

* docs/architecture-notes.md
* docs/commands-reference.md

---

# Author

Phua Kia Heng

Full-Stack Web Application Developer

Technologies:

Angular • Node.js • AWS Lambda • API Gateway • DynamoDB • Docker • REST APIs • JWT • AWS SDK • Serverless Architecture

```
```


