const UserModel = require('../modeles/users')

const users = {

    treatForm(req, res, next) {

        let { pseudo, email, password } = req.body

        if ( !pseudo | !email | !password ) {
            return res.sendStatus(400) }

        UserModel.create({
            pseudo,
            email,
            password
        }).then(() => console.log("Fiche Créée")
        )

       res.redirect('/')
       
},
}

module.exports = users;