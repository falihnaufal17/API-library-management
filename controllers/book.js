const response = require('../response');
const conn = require('../connection');

exports.findBookId = (req, res) => {
    const bookid = req.params.bookid;

    conn.query('SELECT * FROM book WHERE bookid = ?', bookid, (err, result) => {
        if (err) console.log(err);

        response.ok(result, res);
    })
}

exports.findBook = (req, res) => {
    const search = req.query.search || ''
    conn.query(`SELECT book.bookid, book.name, book.writer, book.location, category.category, book.created_at, book.updated_at FROM book INNER JOIN category ON book.categoryid = category.categoryid WHERE category LIKE '%${search}%' OR location LIKE '%${search}%'`, (err, result) => {
        if (err) console.log(err);

        response.ok(result, res);
    })
}

exports.addBook = (req, res) => {
    const books = {
        name: req.body.name,
        writer: req.body.writer,
        location: req.body.location,
        categoryid: req.body.categoryid,
        created_at: new Date(),
        updated_at: new Date()
    }

    conn.query('INSERT INTO book SET ?', books, (err, result) => {
        if (err) console.log(`oops something wrong! ${err}`)

        res.send({
            message: 'Data saved successfully',
            status: 201,
            data: result
        })
    })
}

exports.updateBook = (req, res) => {
    const bookid = req.params.bookid;

    const books = {
        name: req.body.name,
        writer: req.body.writer,
        location: req.body.location,
        categoryid: req.body.categoryid,
        updated_at: new Date()
    }

    conn.query('UPDATE book SET ? WHERE bookid = ?', [books, bookid], (err, result) => {
        if (err) throw err;

        res.send({
            message: 'Data updated successfully',
            status: 200,
            data: result
        });
    })
}

exports.deleteBook = (req, res) => {
    const bookid = req.params.bookid;

    conn.query('DELETE FROM book WHERE bookid = ?', bookid, (err, result) => {
        if (err) throw err;

        res.send({
            message: 'Data deleted successfully',
            status: 200,
            data: result
        })
    })
}