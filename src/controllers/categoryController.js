const catModel = require('../models/categoryModel')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getCategory: (req, res) => {
        catModel.getCategory((err, result) => {
            if (err) console.error(err)

            miscHelper.response(res, result, 200)
        })
    },

    addCategory: (req, res) => {
        const data = {
            category: req.body.category
        }

        catModel.addCategory(data)
            .then(() => {
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                console.error(error)
            })
    },

    deleteCategory: (req, res) => {
        const categoryid = req.params.categoryid

        catModel.updateCategory(categoryid)
            .then((resultCat) => {
                const result = resultCat[0]
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.error(error)
            })
    },

    categoryById: (req, res) => {
        const categoryid = req.params.categoryid;

        catModel.categoryById(categoryid)
            .then((resultCat) => {
                const result = resultCat[0]
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.error(error)
            })
    }
}