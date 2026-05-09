import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./config/dynamodb.js";

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Todo id is required",
        }),
      };
    }

    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Todo deleted successfully",
        deletedId: id,
      }),
    };
  } catch (error) {
    console.error("DELETE error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Failed to delete todo",
      }),
    };
  }
};
