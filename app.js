require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 1700;

const bookRoute = require('./src/routes/bookRoute')
const catRoute = require('./src/routes/categoryRoute')

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to library!')
})
app.use('/books', bookRoute)
app.use('/category', catRoute)