const response = require('../response');
const conn = require('../connection');

exports.getCategoryId = (req, res) => {
    const categoryid = req.params.categoryid;
    conn.query('SELECT * FROM category WHERE categoryid = ?', categoryid, (err, result) => {
        if (err) throw err;

        response.ok(result, res);
    })
}

exports.getAllCategory = (req, res) => {

    conn.query('SELECT * FROM category', (err, result) => {
        if (err) console.log(err)

        response.ok(result, res);
    })
}

exports.addCategory = (req, res) => {
    const categories = {
        category: req.body.category
    }

    conn.query('INSERT INTO category SET ?', categories, (err, result) => {
        if (err) console.log(err);

        res.send({
            message: 'Data saved successfully',
            data: result
        })
    })
}

exports.updateCategory = (req, res) => {
    const categoryid = req.params.categoryid;

    const categories = {
        category: req.body.category
    }

    conn.query('UPDATE category SET ? WHERE categoryid = ?', [categories, categoryid], (err, result) => {
        if (err) throw err;

        res.send({
            message: 'Data updated successfully',
            data: result
        })
    })
}