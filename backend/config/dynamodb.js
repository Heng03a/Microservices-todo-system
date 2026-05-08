import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const isLocal = process.env.DYNAMODB_MODE === "local";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,

  ...(isLocal && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy",
    },
  }),
});

export const docClient = DynamoDBDocumentClient.from(client);

export const TABLE_NAME = process.env.DYNAMODB_TABLE;
