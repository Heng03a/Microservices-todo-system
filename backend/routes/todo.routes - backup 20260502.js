import express from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todo.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let todos = await getTodos();

    const { sort } = req.query;

    if (sort === "newest") {
      todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sort === "oldest") {
      todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todo" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await createTodo(title.trim());

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await updateTodo(req.params.id, req.body);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await deleteTodo(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted", todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

export default router;
