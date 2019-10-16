# droidAPI

## What is it for?

It's a recrutment task. The goal was to:

- Create API that allows "droids" to have a basic communication
- Conversation should be validated (valid inputs are: "YES" | "NO" | "HELLO" | 0 - 100)
- Droid should be able to prove it's droid only once
- Conversation should be stored somewhere and allow people download it after passing proper values

## How to start and talk as droid

1. App is using Node so first install all dependencies. 
2. Run npm start (nodemon will watch for files changes).
3. Use some tool to do request on localhost with default port 3000 (localhost:3000)
4. Main route is just "/"
5. Required parameters are: message and droidId. Method is GET

## How to get conversation

1. Use /get-conversation endpoint. Method is also GET
2. Pass two parameters: date and message. Use date format that will be understood by Date constructor in JS (i.e. 2019-10-17)

## How to run tests

Just run command: npm run test. They're testing basic functionalities and ensures that conversation with droid works as expected.

### Ideas:

- Conversation should be stored as a JSON file or being sent into some DB in order to keep the data after app is closed/recompiled
- Switching into TypeScript