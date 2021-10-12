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

        UserModel.findOne({
            pseudo: pseudo,
            /* password: password ne pas le mettre car cripté plus tard */
        }).then((user) => {                             //Si l'entrée est valide fais ça
            res.send(user).status(200)
        }).catch(() => {                            //Si l'entrée est pas valide fais ça
            res.send("Pas cool").status(500)
        })
    },

    treatUserId(req, res, next) {
        let id = req.body._id
        console.log(id + " bruuuuuuh!")
    }
       
}

module.exports = users;