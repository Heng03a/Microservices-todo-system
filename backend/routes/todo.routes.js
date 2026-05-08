import express from "express";

import {
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { v4 as uuidv4 } from "uuid";
import { docClient, TABLE_NAME } from "../config/dynamodb.js";

const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    res.json(result.Items || []);
  } catch (error) {
    console.error("GET error:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

// POST create todo
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = {
      id: uuidv4(),
      title: title.trim(),
      completed: completed ?? false,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: todo,
      })
    );

    res.status(201).json(todo);
  } catch (error) {
    console.error("POST error:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

// PUT update todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "SET #title = :title, completed = :completed",
        ExpressionAttributeNames: {
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":title": title,
          ":completed": completed,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("PUT error:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

export default router;
