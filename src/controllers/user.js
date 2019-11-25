const userModels = require('../models/user')
const miscHelper = require('../helpers/helpers')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')

module.exports = {
    getIndex: (req, res) => {
        return res.json({ message: 'Hello' })
    },

    getUsers: (req, res) => {
        userModels.getUsers()
            .then((resultUser) => {
                const result = resultUser
                resultUser.map((item) => {
                    delete item.salt
                    delete item.password
                })
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    userDetail: (req, res) => {
        const iduser = req.params.iduser

        userModels.detailUser(iduser)
            .then((resultUser) => {
                const result = resultUser[0]
                delete result.salt
                delete result.password
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    register: async (req, res) => {
        const salt = miscHelper.generateSalt(18)
        const passwordHash = miscHelper.setPassword(req.body.password, salt)

        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: 'dnqtceffv',
                api_key: '796497613444653',
                api_secret: 'We2TAGrwko6E8C4t3Uemrm9kbeA'
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }
        let filename = 'images/' + req.file.filename
        console.log("FILENYA: ", filename)

        const data = {
            id_card: req.body.id_card,
            name: req.body.name,
            email: req.body.email,
            password: passwordHash.passwordHash,
            image: await geturl(),
            salt: passwordHash.salt,
            token: '',
            status: 0,
            idrole: req.body.idrole,
            isverify: 'false',
            created_at: new Date(),
            updated_at: new Date()
        }

        userModels.register(data)
            .then(() => {
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                miscHelper.response(res, 'Email sudah terdaftar!', 403)
                console.log(error)
            })
    },

    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        if (email === '' || password === '') {
            miscHelper.response(res, 'email or password is empty!', 403, 'forbidden')
        } else {
            userModels.getByEmail(email)

                .then((result) => {
                    const dataUser = result[0]
                    const usePassword = miscHelper.setPassword(password, dataUser.salt).passwordHash

                    if (usePassword === dataUser.password) {
                        dataUser.token = jwt.sign({
                            iduser: dataUser.iduser,
                            name: dataUser.name,
                            image: dataUser.image,
                            email: dataUser.email,
                            status: dataUser.status,
                            role: dataUser.namerole
                        }, process.env.SECRET_KEY, { expiresIn: '30m' })
                        const token = dataUser.token
                        delete dataUser.salt
                        delete dataUser.password

                        userModels.updateToken(email, token)
                            .then((resultToken) => {
                                return miscHelper.response(res, resultToken, 200)
                            })
                            .catch((error) => {
                                console.log(error)
                            })

                        return miscHelper.response(res, dataUser, 200)
                    } else {
                        return miscHelper.response(res, null, 403, 'Wrong Password!')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },

    logout: (req, res) => {
        const iduser = req.params.iduser

        userModels.logout(iduser)
            .then(() => {
                miscHelper.response(res, 'anda sudah logout', 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    verifyUser: (req, res) => {
        const iduser = req.params.iduser
        const data = {
            isverify: "true",
            updated_at: new Date()
        }
        userModels.verifyUser(iduser, data)
            .then(() => {
                miscHelper.response(res, 'verifikasi berhasil', 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    updateUser: async (req, res) => {
        const iduser = req.params.iduser
        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: 'dnqtceffv',
                api_key: '796497613444653',
                api_secret: 'We2TAGrwko6E8C4t3Uemrm9kbeA'
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }
        let filename = 'images/' + req.file.filename
        console.log("FILENYA: ", filename)

        const data = {
            id_card: req.body.id_card,
            name: req.body.name,
            email: req.body.email,
            image: await geturl(),
            updated_at: new Date()
        }

        userModels.updateUser(iduser, data)
            .then(() => {
                miscHelper.response(res, data, 200)
                console.log(res)
                console.log(data)
            })
            .catch((error) => {
                miscHelper.response(res, 'Oops something wrong with server :(')
                console.log(res)
                console.log(error)
            })

    }
}