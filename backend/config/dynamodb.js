import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-1",
});

export const dynamoDb = DynamoDBDocumentClient.from(client);

export const TODO_TABLE = process.env.TODO_TABLE || "Todos";
