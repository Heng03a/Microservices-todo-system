import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "fake",
    secretAccessKey: "fake"
  }
});

const params = {
  TableName: "Todos",
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  BillingMode: "PAY_PER_REQUEST"
};

async function createTable() {
  try {
    const data = await client.send(new CreateTableCommand(params));
    console.log("Table created:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

createTable();
