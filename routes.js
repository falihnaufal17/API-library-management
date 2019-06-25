module.exports = (app) => {
    const controller = require('./controllers')
    /* Routes for Books */

    app.route('/:bookid').get(controller.findBookId);

    // Cari buku berdasarkan category and location
    app.route('/').get(controller.findBook);

    app.route('/').post(controller.addBook);

    app.route('/:bookid').patch(controller.updateBook);

    app.route('/:bookid').delete(controller.deleteBook)

    /* Routes for Categories */

    app.route('/category').get(controller.getAllCategory)

    app.route('/category').post(controller.addCategory)

    app.route('/category/:categoryid').patch(controller.updateCategory)
}
