require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const whitelist = process.env.WHITELIST
const port = process.env.SERVER_PORT || 1700;

const bookRoute = require('./src/routes/book')
const catRoute = require('./src/routes/category')
const locationRoute = require('./src/routes/location')
const loaningRoute = require('./src/routes/loaning')
const statusRoute = require('./src/routes/status')
const userRoute = require('./src/routes/user')
app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
});

// const corsOptions = (req, callback) => {
//     if (whitelist.split('').indexOf(req.header('origin')) !== -1) {
//         console.log('success')
//         return callback(null, {
//             origin: true
//         })
//     } else {
//         console.log('Failed')
//         return callback(null, {
//             origin: false
//         })
//     }
// }

// app.use(cors())
// app.options('*', cors(corsOptions))
app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});
app.use(xssFilter())
app.use(logger('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

app.use('/books', bookRoute)
app.use('/category', catRoute)
app.use('/location', locationRoute)
app.use('/loaning', loaningRoute)
app.use('/status', statusRoute)
app.use('/users', userRoute)