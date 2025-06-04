import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./lib/handler";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function deleteNote(event: APIGatewayProxyEvent) {
  const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  const noteId = event.pathParameters?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }
  
  if (!noteId) {
    throw new Error("Note ID is required");
  }

  const params = {
    TableName: Resource.Notes.name,
    Key: {
      userId,
      noteId,
    },
  };

  await dynamoDb.send(new DeleteCommand(params));

  return JSON.stringify({ status: true });
}

export const main = handler(deleteNote);
