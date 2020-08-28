# code-creativity

Retrieve information about cars and displayed as a card list. Implement search and cars's comparison

## About the API data used

The cars.json, located in the server folder, was retrieved from the API endpoint: https://private-anon-f01e0dd1fc-carsapi1.apiary-mock.com/cars.

You can find more information about this API into [carsapi1.docs.apiary.io](https://carsapi1.docs.apiary.io/#reference/0/cars-collection/list-all-cars) to view it in the browser.

## Steps to run it locally

### Install dependencies

`yarn`

Launches the web application into the port 3000.<br />

### Run json-server

`json-server ./server/cars.json -p 3001`

Launches the json server into the port 3001.<br />

### Run react project

`yarn start`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
