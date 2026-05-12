import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
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

    // Handle CORS preflight
    if (
      event.requestContext?.http?.method === "OPTIONS" ||
      event.httpMethod === "OPTIONS"
    ) {
      return {
        statusCode: 204,
        headers: corsHeaders,
        body: "",
      };
    }

    const id = event.pathParameters?.id;
    
    const body = JSON.parse(event.body || "{}");

    const { title, completed } = body;

    if (title === undefined && completed === undefined) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "At least title or completed is required",
        }),
      };
    }

    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (title !== undefined) {
      updateExpressions.push("#title = :title");
      expressionAttributeNames["#title"] = "title";
      expressionAttributeValues[":title"] = title;
    }

    if (completed !== undefined) {
      updateExpressions.push("completed = :completed");
      expressionAttributeValues[":completed"] = completed;
    }

    updateExpressions.push("updatedAt = :updatedAt");
    expressionAttributeValues[":updatedAt"] = new Date().toISOString();

    const result = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames:
          Object.keys(expressionAttributeNames).length > 0
            ? expressionAttributeNames
            : undefined,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("PUT error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Failed to update todo",
      }),
    };
  }
};
