import { table } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      },
      args: {
        auth: { iam: true }
      },
    }
  },
  domain: {
    name: $app.stage === "prod" ? "api.buzzwordbingo.live" : "dev.api.buzzwordbingo.live",
  }
});

api.route("GET /notes", "packages/backend/src/list.main");
api.route("POST /notes", "packages/backend/src/create.main");
api.route("GET /notes/{id}", "packages/backend/src/get.main");
api.route("PUT /notes/{id}", "packages/backend/src/update.main");
api.route("DELETE /notes/{id}", "packages/backend/src/delete.main");
