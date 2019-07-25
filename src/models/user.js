const connection = require('../configs/db')

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT user.iduser, user.id_card, user.name, user.email, user.password, user.salt, user.token, user.status, role.namerole, user.created_at, user.updated_at FROM user INNER JOIN role ON user.idrole = role.idrole', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    detailUser: (iduser) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT user.iduser, user.id_card, user.name, user.email, user.token, user.status, role.namerole, user.created_at, user.updated_at FROM user INNER JOIN role ON user.idrole = role.idrole WHERE iduser = ?', iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT user.iduser, user.iduser, user.id_card, user.name, user.email, user.password, user.salt, user.token, user.status, role.namerole, user.created_at, user.updated_at FROM user INNER JOIN role ON user.idrole = role.idrole WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result)
                    connection.query('UPDATE user SET status = 1 WHERE email=?', email)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateToken: (email, token) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET token = ? WHERE email = ?', [token, email], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    logout: (iduser) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET token = '', status = 0 WHERE iduser = ?`, iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}