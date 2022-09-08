# Gateway Project

NestJS Api for Gateway Project

## First Steps

After clone the project you can run the app by the following command:

```bash
yarn start:fresh
```

## For running all test

```bash
yarn test
```
## Interact and UI

For basic UI for interact with the api you can try the Swagger Doc at http://localhost/api-doc or download and run the project https://github.com/lregaladohdez/gateway.git

By default the app is ruuning in port 4000 and use a sqlite database at prisma/dev.db, you can change this at the .env file. You can also crate you own environment file and run any command using your custom environment as:

```bash
npx dotenv -e your_file yarn start:fresh
npx dotenv -e your_file yarn test
```