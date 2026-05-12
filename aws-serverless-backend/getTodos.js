import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./config/dynamodb.js";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin":
    "http://microservices-todo-frontend-phua-kia-heng.s3-website-us-east-1.amazonaws.com",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(result.Items || []),
    };
  } catch (error) {
    console.error("GET error:", error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Failed to fetch todos",
      }),
    };
  }
};
