import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./config/dynamodb.js";

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Todo id is required" }),
      };
    }

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
