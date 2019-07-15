require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = process.env.SERVER_PORT || 1700;

const bookRoute = require('./src/routes/bookRoute')
const catRoute = require('./src/routes/categoryRoute')
const locationRoute = require('./src/routes/locationRoute')
const loaningRoute = require('./src/routes/loaningRoute')

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(__dirname + '/public'))
// Routes

app.use('/books', bookRoute)
app.use('/category', catRoute)
app.use('/location', locationRoute)
app.use('/loaning', loaningRoute)