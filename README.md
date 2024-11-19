# Nest-js -> Next.js Project

Repo containing api and web

To get started you will need to have the following installed:

- [Node.js](https://nodejs.org/en/download)
- [VSCode](https://code.visualstudio.com/download) (or alternative code editor)
- [Git](https://git-scm.com/download/mac)

## Running The Project

### API

To run the API, follow the below instructions:

Install the packages:

```bash
cd api && yarn
yarn start
```

### Web

In a new terminal for the frontend, add the following `.env` file to the `web` directory:

```
NEXT_PUBLIC_API = 'http://localhost:3000'
```

Then you just need to install the packages then start the frontend:

```bash
cd web && yarn
yarn dev
```

Then navigate to http://localhost:3001/welcome/53167ce7-5b79-435f-861d-a23460c7786a or any url in the format http://localhost:3001/welcome/USER_ID, to view any information about your up coming delivery

## Testing

### API

#### Unit Tests

Unit Tests
The API has unit tests where appropriate. Although comprehensive integration and E2E testing could have been done with more time, only backend unit tests have been implemented for now.

To run all unit tests for the backend, use the following command:

```bash
cd api && yarn test
```

Future Testing
If more time were available, we could implement more comprehensive end-to-end (E2E) testing using tools like Cypress or Jest for both API and frontend components. This would allow us to test main functionalities, as well as individual components of the application.
