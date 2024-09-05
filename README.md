# ITLearning

ITLearning is an innovative online learning hub designed to provide comprehensive educational resources in information technology.
More description ...

## Folder Structure

```
./config: contain the configuration of the whole system
./controllers: contain the source code of the controllers
./models: contain the source code of models
./public: contain the static file such as images, CSS files, Javascript files for front end, etc.
./views: contain the source code of how APIs and HTTP should be returned
```

## ITLearning Deployment

### Step 1: Run Backend (run command from root folder)

1: Create a `.env` file in `config/` directory,
File contain secret value like MongoDB URI:

```
MONGODB_URI="mongodb://cosc2430:fighting@itlearning.ddns.net:27017/ITLearning?authSource=admin"
```

There are alternative options, such as `APP_PORT` to determine the running port of the web application, or `APP_HOST` to determine the allowed coming requests.

2: Install packages
`npm install`


3: Deploy backend
`npm run dev`

4: Back end running on port 3000
Go to 'http://localhost:{APP_PORT}/api-docs' to see APIs

### Step 2: Run Frontend (run command from root folder)

## Note
