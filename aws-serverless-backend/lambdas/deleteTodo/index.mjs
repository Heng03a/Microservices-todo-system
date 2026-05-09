import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

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

    await docClient.send(
      new DeleteCommand({
        TableName: process.env.TODOS_TABLE || "Todos",
        Key: { id },
      })
    );

    return response(200, {
      message: "Todo deleted successfully",
      id,
    });
  } catch (error) {
    console.error("DELETE todo Lambda error:", error);
    return response(500, { message: "Failed to delete todo" });
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
