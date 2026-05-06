import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

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
  Item: {
    id: { S: "1" },
    title: { S: "Boss test todo" },
    completed: { BOOL: false }
  }
};

async function insert() {
  try {
    const data = await client.send(new PutItemCommand(params));
    console.log("Inserted successfully:", data);
  } catch (err) {
    console.error("Error inserting:", err);
  }
}

insert();