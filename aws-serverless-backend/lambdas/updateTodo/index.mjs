import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-1",
});

const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return response(400, { message: "Todo id is required" });
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { title, completed } = body;

    if (title === undefined && completed === undefined) {
      return response(400, {
        message: "At least title or completed is required",
      });
    }

    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (title !== undefined) {
      updateExpressions.push("#title = :title");
      expressionAttributeNames["#title"] = "title";
      expressionAttributeValues[":title"] = title.trim();
    }

    if (completed !== undefined) {
      updateExpressions.push("#completed = :completed");
      expressionAttributeNames["#completed"] = "completed";
      expressionAttributeValues[":completed"] = completed;
    }

    updateExpressions.push("#updatedAt = :updatedAt");
    expressionAttributeNames["#updatedAt"] = "updatedAt";
    expressionAttributeValues[":updatedAt"] = new Date().toISOString();

    const result = await docClient.send(
      new UpdateCommand({
        TableName: process.env.TODOS_TABLE || "Todos",
        Key: { id },
        UpdateExpression: "SET " + updateExpressions.join(", "),
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
    );

    return response(200, result.Attributes);
  } catch (error) {
    console.error("PUT todo Lambda error:", error);
    return response(500, { message: "Failed to update todo" });
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
