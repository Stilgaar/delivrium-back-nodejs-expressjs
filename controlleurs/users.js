const UserModel = require("../modeles/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const users = {
  treatForm(req, res, next) {
    let { pseudo, email, password, verifPassword } = req.body;

    if (!pseudo || !email || !password || !verifPassword) {
      return res.sendStatus(400);
    }

    if (password !== verifPassword) {
      return res.sendStatus(400).send("Les mots de passe de correspondent pas");// le .send ne marche pas, se renseigner auprès d'Antonin
    }
    return UserModel.findOne({ email: email }).then((alreadyExistingUser) => {
      if (alreadyExistingUser === null) {
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        return UserModel.create({
          pseudo,
          email,
          password: hashedPassword,
        }).then((createdUser) => {
          console.log(createdUser);
          return res.status(200).send(createdUser);
        });
      }
      return res.status(400).send("Email déjà existant");
    });
  },

  treatLogin(req, res, next) {
    let { pseudo, password } = req.body;

    if (!pseudo || !password) {
      return res.sendStatus(400);
    }

    UserModel.findOne({
      pseudo: pseudo,
      /* password: password ne pas le mettre car cripté plus tard */
    })
      .then((user) => {
        //Si l'entrée est valide fais ça
        res.send(user).status(200);
      })
      .catch(() => {
        //Si l'entrée est pas valide fais ça
        res.send("Pas cool").status(500);
      });
  },

  treatUserId(req, res, next) {
    let id = req.body._id;
    console.log(id + " bruuuuuuh!");
  },
};

module.exports = users;
