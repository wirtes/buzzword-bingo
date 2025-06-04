import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

type LambdaFunction = (
  event: APIGatewayProxyEvent
) => Promise<APIGatewayProxyResult | string>;

export function handler(lambda: LambdaFunction) {
  return async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body: string;
    let statusCode: number;

    try {
      // Run the Lambda
      const result = await lambda(event);
      
      // Handle string responses (like JSON.stringify results)
      if (typeof result === 'string') {
        body = result;
      } else {
        // Handle full APIGatewayProxyResult responses
        return result;
      }
      
      statusCode = 200;
    } catch (error) {
      console.error(error);
      
      body = JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred"
      });
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Content-Type": "application/json",
      },
    };
  };
} 