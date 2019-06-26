const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book');
const categoryRoutes = require('./routes/category');
const app = express();
const port = process.env.SERVER_PORT || 1700;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/book', bookRoutes);
app.use('/category', categoryRoutes);

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
});