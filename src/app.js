const express = require('express');
const hbs = require('hbs');
const path = require('path');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './views');
const partialsPath = path.join(__dirname, './views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup staic directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address;

    geocode(address, (err, { longitude, lantitude, location } = {}) => {
        if (!address) {
            return res.send({ error: 'No such address has been found' })
        }
        if (err) {
            return res.send({ error: err })
        }

        forecast(longitude, lantitude, (err, forecastData) => {
            if (err) {
                return res.send({ error: err })
            }

            res.send({
                location: location,
                temperature: forecastData.temperature,
                icon: forecastData.icon,
                summary: forecastData.summary,
                summaryDaily: forecastData.summaryDaily,
                temperatureHigh: forecastData.temperatureHigh,
                temperatureLow: forecastData.temperatureLow,
                humidity: forecastData.humidity,
                windSpeed: forecastData.windSpeed,
                precipProbability: forecastData.precipProbability,
            })
        })

    })

});

app.listen(3000, () => console.log('Forecaster is live on port 3000'));