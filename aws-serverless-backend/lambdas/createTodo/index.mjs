import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-1",
});

const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { title, completed } = body;

    if (!title || !title.trim()) {
      return response(400, { message: "Title is required" });
    }

    const todo = {
      id: uuidv4(),
      title: title.trim(),
      completed: completed ?? false,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: process.env.TODOS_TABLE || "Todos",
        Item: todo,
      })
    );

    return response(201, todo);
  } catch (error) {
    console.error("POST todo Lambda error:", error);
    return response(500, { message: "Failed to create todo" });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
    body: JSON.stringify(body),
  };
}
function verifyToken(event) {
  const authHeader =
    event.headers?.authorization || event.headers?.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "");
  const jwtSecret = process.env.JWT_SECRET || "change-this-secret";

  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return null;
  }
}
