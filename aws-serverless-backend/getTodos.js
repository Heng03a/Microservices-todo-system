import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./config/dynamodb.js";

export const handler = async () => {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(result.Items || []),
    };
  } catch (error) {
    console.error("GET error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to fetch todos",
      }),
    };
  }
};