const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../src/views')
const partialsPath = path.join(__dirname, '../src/views/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup staic directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/home', (req, res) => {
    res.render('home', { message: 'welcome !' });
})

app.listen(3000, () => console.log('Forecaster is live on port 3000'));