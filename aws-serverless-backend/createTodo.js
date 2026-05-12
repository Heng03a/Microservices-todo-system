import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

import { docClient, TABLE_NAME } from "./config/dynamodb.js";


const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin":
    "http://microservices-todo-frontend-phua-kia-heng.s3-website-us-east-1.amazonaws.com",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const todo = {
      id: uuidv4(),
      title: body.title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: todo,
      })
    );

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(todo),
    };
  } catch (error) {
    console.error("POST error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to create todo",
      }),
    };
  }
};