const UserModel = require('../modeles/users')

const users = {

    treatForm(req, res, next) {

        let { pseudo, email, password } = req.body
            console.log(req.body)
        if (!pseudo | !email | !password) {
            return res.sendStatus(400)
        }

        UserModel.create({
            pseudo,
            email,
            password
        }).then((createdUser) => {
            console.log(createdUser)
            res.send(createdUser)
        }
        )
    },
}

module.exports = users;