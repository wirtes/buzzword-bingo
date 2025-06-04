import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./lib/handler";
import { Note } from "./lib/types";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function listNotes(event: APIGatewayProxyEvent) {
  const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const params = {
    TableName: Resource.Notes.name,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  const result = await dynamoDb.send(new QueryCommand(params));
  
  return JSON.stringify(result.Items as Note[]);
}

export const main = handler(listNotes);
