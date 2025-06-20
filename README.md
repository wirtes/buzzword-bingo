# Buzzword Bingo App

My Clone

A full-stack serverless buzzword bingo application built with SST, React, and AWS.

> **Conference Demo Project**: This application was created as a demonstration project for [InfoTech Research Group's LIVE 2025 conference](https://www.infotech.com/events/las-vegas-live-june-10-12-2025) in Las Vegas (June 10-12, 2025 at The Bellagio). It showcases modern serverless architecture patterns, cloud-native development practices, and rapid prototyping with AI.

## Architecture

We use React.js, AWS Lambda, API Gateway, DynamoDB, and Cognito. This repo is a full-stack serverless app built with SST.

- The `infra/` directory defines our AWS infrastructure.
- The `packages/backend` directory contains the Lambda functions that power the CRUD API.
- The `packages/frontend` directory contains the React app.

It's a single-page React app powered by a serverless CRUD API with user authentication and file uploads.

## Prerequisites

Before you get started:

1. [Configure your AWS credentials](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)
2. [Install the SST CLI](https://ion.sst.dev/docs/reference/cli/)

## Usage

Clone this repo.

```bash
git clone https://github.com/your-username/buzzword-bingo.git
```

Install dependencies.

```bash
npm install
```

### Developing Locally

From your project root run:

```bash
npx sst dev
```

This will start your frontend and run your functions [Live](https://ion.sst.dev/docs/live/).

### Deploying to Production

Run this in the project root to deploy it to production.

```bash
npx sst deploy --stage prod
```

## License

MIT License

Copyright (c) 2025 Justin St-Maurice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

Created by [Justin St-Maurice](https://www.linkedin.com/in/justinstmaurice/) for demonstration at InfoTech Research Group's LIVE 2025 conference.

## Conference Information

This project was developed as part of the presentation materials for [InfoTech LIVE 2025](https://www.infotech.com/events/las-vegas-live-june-10-12-2025), taking place June 10-12, 2025 at The Bellagio in Las Vegas. The conference focuses on "Transform IT, Transform Everything" and brings together over 4,000 IT professionals to explore how exponential technologies are transforming organizations.

## Support

For questions or support regarding this demonstration project, please reach out via [LinkedIn](https://www.linkedin.com/in/justinstmaurice/).