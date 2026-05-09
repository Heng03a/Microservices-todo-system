import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
});

export const docClient = DynamoDBDocumentClient.from(client);

export const TABLE_NAME = "Todos";