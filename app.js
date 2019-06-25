const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = process.env.SERVER_PORT || 1700;

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);