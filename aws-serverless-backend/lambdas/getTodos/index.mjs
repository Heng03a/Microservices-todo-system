import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-1",
});

const docClient = DynamoDBDocumentClient.from(client);

export const handler = async () => {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: process.env.TODOS_TABLE || "Todos",
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
      body: JSON.stringify(result.Items || []),
    };
  } catch (error) {
    console.error("GET todos Lambda error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Failed to fetch todos",
      }),
    };
  }
};