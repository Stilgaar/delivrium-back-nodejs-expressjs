const UserModel = require('../modeles/users')

const users = {

    treatForm(req, res, next) {

        let { pseudo, email, password } = req.body
            
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
    
    treatLogin(req, res, next) {
        let { pseudo, password } = req.body

        if (!pseudo | !password) {
            return res.sendStatus(400)
        } 

        UserModel.login({
            pseudo,
            password
        }).then((loggedInUser) => {
            console.log(loggedInUser)
        })
    }
       
}

module.exports = users;