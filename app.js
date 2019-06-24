require('dotenv/config');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 1700;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const search = req.query.search;
    connection.query(`SELECT * FROM book WHERE category LIKE '%${search}%' OR location LIKE '%${search}%'`, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    })
})

app.get('/', (req, res) => {

    connection.query('SELECT * FROM book', (err, result) => {
        if (err) console.log(`oops something wrong! ${err}`);

        res.json(result);
    })
})

app.post('/', (req, res) => {
    const books = {
        name: req.body.name,
        writer: req.body.writer,
        location: req.body.location,
        category: req.body.category,
        created_at: new Date(),
        updated_at: new Date()
    }

    connection.query('INSERT INTO book SET ?', books, (err, result) => {
        if (err) console.log(`oops something wrong! ${err}`)

        res.json(result);
    })
})

app.patch('/:bookid', (req, res) => {
    const bookid = req.params.bookid;

    const books = {
        name: req.body.name,
        writer: req.body.writer,
        location: req.body.location,
        category: req.body.category,
        updated_at: new Date()
    }

    connection.query('UPDATE book SET ? WHERE bookid = ?', [books, bookid], (err, result) => {
        if (err) console.log(err);

        res.json(result);
    })
})

app.delete('/:bookid', (req, res) => {
    const bookid = req.params.bookid;

    connection.query('DELETE FROM book WHERE bookid = ?', bookid, (err, result) => {
        if (err) console.log(err);

        res.json(result)
    })
})