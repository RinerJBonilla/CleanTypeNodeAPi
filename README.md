# CleanTypeNodeAPi
A Clean Node API with Typescript


## NOTE: CREATE A ENV FILE WITH THE FOLLOWING VARIABLES

- PORT:
the port on which the API will be running

- TOKEN_SECRET:
the token used to encrypt the user session token

### SightEngine Credentials (content mod)

- API_USER
- API_SECRET

### Algolia Credentials (Search Engine)

- ALGOLIA_CLI
- ALGOLIA_PASS

### Database Credentials

- D_DATABASE
- D_DBPORT
- D_USER
- D_PASSWORD
- D_HOST
- MYSQL_HOST

### Test Enviroment: Needs to create the test database container defined in test folder

- T_D_HOST
- T_D_DATABASE
- T_D_USER
- T_D_PASSWORD
- T_D_DBPORT
- T_D_TOKEN: hard-coded token string with the encrypted data, user: koko, pass: 1234 for test purposes


## Available Scripts

In the project directory, you can run:

### `docker-compose up`

to build and the MariaDB Database based on a docker container.

## INSIDE THE APP FOLDER (APP)

### `npm run dev`

Runs the API on the previously defined port.
to check all routes, check localhost:[PORT]/api-docs created with Swagger

### `npm run test`

Runs all the defined test that check the functionality of the API using JEST unit Testing.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
