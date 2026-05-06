import { v4 as uuidv4 } from "uuid";
import {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

import { dynamoDb, TODO_TABLE } from "../config/dynamodb.js";

export async function getTodos() {
  const result = await dynamoDb.send(
    new ScanCommand({
      TableName: TODO_TABLE,
    })
  );

  return result.Items || [];
}

export async function getTodoById(id) {
  const result = await dynamoDb.send(
    new GetCommand({
      TableName: TODO_TABLE,
      Key: { id },
    })
  );

  return result.Item || null;
}

export async function createTodo(title) {
  const now = new Date().toISOString();

  const todo = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };

  await dynamoDb.send(
    new PutCommand({
      TableName: TODO_TABLE,
      Item: todo,
    })
  );

  return todo;
}

export async function updateTodo(id, data) {
  const existingTodo = await getTodoById(id);

  if (!existingTodo) {
    return null;
  }

  const updatedTodo = {
    ...existingTodo,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  await dynamoDb.send(
    new PutCommand({
      TableName: TODO_TABLE,
      Item: updatedTodo,
    })
  );

  return updatedTodo;
}

export async function deleteTodo(id) {
  const existingTodo = await getTodoById(id);

  if (!existingTodo) {
    return null;
  }

  await dynamoDb.send(
    new DeleteCommand({
      TableName: TODO_TABLE,
      Key: { id },
    })
  );

  return existingTodo;
}
