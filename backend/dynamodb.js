import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";

export const TABLE_NAME = "Todos";

export const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-1",
  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
  },
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function ensureTodosTable(maxRetries = 10) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Checking DynamoDB table "${TABLE_NAME}"... attempt ${attempt}`);

      await dynamoClient.send(
        new DescribeTableCommand({
          TableName: TABLE_NAME,
        })
      );

      console.log(`DynamoDB table "${TABLE_NAME}" already exists`);
      return;
    } catch (error) {
      if (error.name === "ResourceNotFoundException") {
        console.log(`Creating DynamoDB table "${TABLE_NAME}"...`);

        await dynamoClient.send(
          new CreateTableCommand({
            TableName: TABLE_NAME,
            AttributeDefinitions: [
              { AttributeName: "id", AttributeType: "S" },
            ],
            KeySchema: [
              { AttributeName: "id", KeyType: "HASH" },
            ],
            BillingMode: "PAY_PER_REQUEST",
          })
        );

        console.log(`DynamoDB table "${TABLE_NAME}" created`);
        return;
      }

      console.log(`DynamoDB not ready yet. Retry ${attempt}/${maxRetries}`);

      if (attempt === maxRetries) {
        console.error("DynamoDB startup failed after retries:", error);
        throw error;
      }

      await sleep(2000);
    }
  }
}
