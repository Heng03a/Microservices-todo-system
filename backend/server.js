import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { ensureTodosTable } from "./dynamodb.js";

const app = express();

app.use(cors({
  origin: "http://localhost:4200",
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "microservices-backend",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

async function startServer() {
  try {
    await ensureTodosTable();

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
}

startServer();
