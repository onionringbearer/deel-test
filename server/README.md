Welcome to my version of the challenge.

I provide a demo page with several examples of the autocomplete, along with a brief description.

The idea is to show that the autocomplete component created is seriously reusable and versatile, even if time did not really allow to cover everything a component of that nature should.

## Running the app

### Server

For some of the autocompletes in the demo page, a localhost endpoint is being used.

To run the server included for this purpose, go to the `/server` folder and run

`npm i` and then `npm start`

The app will run at http://localhost:8080. Leave running to use with the FE app.

### Client

Go to the `/autocomplete` folder and run

`npm i` and then `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Running the app in production mode

One of the scenarios shown would be best executed with the app in production mode.

To achieve this, open another console and go to the `/autocomplete` folder. From there, run

`npm install -g serve` and then `npm run start-prod`.

The output of the last command will yield a localhost URL with a random port. You can use that to load the app in production mode.

### Testing the loading message

For this we need to simulate a slower connection. Using Chrome, open the Developer Tools and go to the Network tab.

At the very top of the tab, there should a dropdown with 'No throttling' selected. Expand it and select 'Slow 3G'.

Use the second dropdown to test the loading message while waiting for a response.

_This app was created using Node v21.7.1 and npm v10.5.0._
