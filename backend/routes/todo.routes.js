import express from "express";
import { v4 as uuidv4 } from "uuid";

import { dynamoClient, TABLE_NAME } from "../dynamodb.js";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const router = express.Router();


// 🔧 DynamoDB Client (LOCAL)

const docClient = DynamoDBDocumentClient.from(dynamoClient);


// ======================================================
// ✅ GET ALL TODOS
// ======================================================
router.get("/", async (req, res) => {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLE_NAME })
    );

    res.json(result.Items || []);
  } catch (error) {
    console.error("GET error:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});


// ======================================================
// ✅ CREATE TODO (UUID)
// ======================================================
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;

    // 🔍 validation
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = {
      id: uuidv4(),
      title,
      completed: completed ?? false,
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


// ======================================================
// ✅ UPDATE TODO
// ======================================================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const updatedTodo = {
      id,
      title,
      completed: completed ?? false,
    };

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "SET title = :title, completed = :completed",
        ExpressionAttributeValues: {
          ":title": title,
          ":completed": completed ?? false,
        },
      })
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error("PUT error:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

// ======================================================
// ✅ DELETE TODO
// ======================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
});


export default router;
