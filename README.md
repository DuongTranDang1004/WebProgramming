# ITLearning

ITLearning is an innovative online learning hub designed to provide comprehensive educational resources in information technology.

## Folder Structure

```
./config: contain the configuration of the whole system
./controllers: contain the source code of the controllers
./models: contain the source code of models
./static: contain the static file such as images, CSS files, Javascript files for front end, etc.
./views: contain the source code of how APIs and HTTP should be returned
./routes: contain the route of the APIs and pages
./utils: contain the function which can be share between controllers and middleware
./middlewares: contain the middlewares of the application
./database: contain the database deployment bash and data
```

## ITLearning Deployment

### Step 1 (Optional): Start database

1: Make sure you are at the root folder

2: Go to database folder

3: Run this command to deploy database:
`docker compose up -d .`

### Step 2: Populate data

1: Create a `.env` file in `config/` directory,
File contain secret value like MongoDB URI or your own MongoDB URI:

```
MONGODB_URI="mongodb://cosc2430:fighting@itlearning.ddns.net:27017/ITLearning?authSource=admin"
```

There are alternative options, such as `APP_PORT` to determine the running port of the web application, or `APP_HOST` to determine the allowed coming requests.

2: Install packages:
`npm install`

3: Populate data:
`npm run populate`

### Step 3: Run application

1: Deploy application
`npm run dev`

2: Back end running on port 3000
Go to 'http://localhost:{APP_PORT}/' to see applications

## Accounts

### Admin account

-   Email: admin@itlearning.ddns.net
-   Password: Admin123

### Learner account

-   Email: learner@itlearning.ddns.net
-   Password: Learner123

### Instructor account

-   Email: instructor@itlearning.ddns.net
-   Password: Instructor123
