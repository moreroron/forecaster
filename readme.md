# forecaster

A small but useful app for weather information.

[https://forecaster.com](https://morero-forecaster.herokuapp.com/)

## Technical Info
forecaster lets the user type any location in the world, and by fetching two 3rd party APIs and chaining them together in the background, the app responeds with an informative forecast for today.

## Built with
Front-end - javascript

Back-end - Nodejs & express.js (handlebars as the template engines)

## APIs:
* [mapbox](https://www.mapbox.com) - api for fetching latitude & longitude data
* [darksky](https://www.darksky.net) - api for fetching the forecast itself (using mapbox returned data)

## Screenshots
![alt text](screenshot.png)
