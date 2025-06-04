import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./lib/handler";
import { Note } from "./lib/types";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function getNote(event: APIGatewayProxyEvent) {
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

  const result = await dynamoDb.send(new GetCommand(params));
  
  if (!result.Item) {
    throw new Error("Note not found");
  }

  return JSON.stringify(result.Item as Note);
}

export const main = handler(getNote);
