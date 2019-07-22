const connection = require('../configs/db')

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user', (err, result) => {
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
            connection.query('SELECT * FROM user WHERE iduser = ?', iduser, (err, result) => {
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

    getByEmail: (email) =>{
        return new Promise((resolve, reject) =>{
            connection.query('SELECT iduser, name, email, password, created_at, updated_at, salt, password FROM user WHERE email = ?', email, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}