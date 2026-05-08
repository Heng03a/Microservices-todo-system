import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3040;

app.use(cors({
  origin: "http://localhost:4200",
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "microservices-backend",
    database: process.env.DYNAMODB_MODE === "aws"
      ? "AWS Cloud DynamoDB"
      : "DynamoDB Local",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

