const request = require('request');

const forecast = (longitude, lantitude, callback) => {
    const url = `https://api.darksky.net/forecast/26f8ebad5a800282b230e89ce4fb4595/${longitude},${lantitude}?units=si`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Can not fetch data', undefined);
        } else if (body.error) {
            callback('No such long/lat', undefined);
        } else {
            console.log(body);
            callback(undefined, {
                temperature: body.currently.temperature,
                icon: body.daily.data[0].icon,
                summary: body.currently.summary,
                summaryDaily: body.daily.data[0].summary,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow,
                humidity: body.currently.humidity,
                windSpeed: body.daily.data[0].windSpeed,
                precipProbability: body.daily.data[0].precipProbability
            })
        }
    })
}

module.exports = forecast;
