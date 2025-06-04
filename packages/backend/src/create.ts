import * as uuid from "uuid";
import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./lib/handler";
import { Note, CreateNoteRequest } from "./lib/types";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function createNote(event: APIGatewayProxyEvent) {
  const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Parse request body
  const data: CreateNoteRequest = event.body 
    ? JSON.parse(event.body) 
    : { content: "", attachment: "" };

  const note: Note = {
    userId,
    noteId: uuid.v1(),
    content: data.content,
    attachment: data.attachment || "",
    createdAt: Date.now(),
  };

  const params = {
    TableName: Resource.Notes.name,
    Item: note,
  };

  await dynamoDb.send(new PutCommand(params));

  return JSON.stringify(note);
}

export const main = handler(createNote);
