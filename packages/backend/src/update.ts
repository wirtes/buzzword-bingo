import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./lib/handler";
import { UpdateNoteRequest } from "./lib/types";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function updateNote(event: APIGatewayProxyEvent) {
  const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  const noteId = event.pathParameters?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }
  
  if (!noteId) {
    throw new Error("Note ID is required");
  }

  const data: UpdateNoteRequest = event.body 
    ? JSON.parse(event.body) 
    : {};

  const params = {
    TableName: Resource.Notes.name,
    Key: {
      userId,
      noteId,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":content": data.content || null,
      ":attachment": data.attachment || null,
    },
  };

  await dynamoDb.send(new UpdateCommand(params));

  return JSON.stringify({ status: true });
}

export const main = handler(updateNote);
