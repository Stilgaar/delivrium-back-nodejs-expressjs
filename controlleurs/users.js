const UserModel = require("../modeles/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const users = {
  treatForm(req, res, next) {
    let { pseudo, email, password, verifPassword } = req.body;

    if (!pseudo || !email || !password || !verifPassword) {
      return res.sendStatus(400);
    }

    if (password !== verifPassword) {
      return res.sendStatus(400).send("Les mots de passe de correspondent pas"); // le .send ne marche pas, se renseigner auprès d'Antonin
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
    }).then((user) => {
      //Si l'entrée est valide fais ça

      if (user === null) {
        console.log("user doesn't exists");
        return res.status(404).send("Le compte n'existe pas");
      }
      let isSamePassword = bcrypt.compareSync(password, user.password);

      if (!isSamePassword) {
        console.log("Mauvais mdp, fdp");
        return res.status(404).send({ error: "Mauvais mot de passe" });
      }


      const token = jwt.sign(
        {
          userId: user._id,
        },
        "secret",
        { expiresIn: "24h" }
      );
      console.log(token + " Voilà le log");

      res
        .status(200)
        .json({ token: token, message: "connection réussie", user });
    });
  },

  treatUserId(req, res, next) {
    let id = req.body._id;
  },

  // controleur à utliliser (je suppose)
  getInfos(req, res, next) {
    console.log(req.body)
    res.send(req.user);
  },


  // le req.headers.authorization toppe les infos 'bearer token'
  // le if !authorisation check si ça existe, si ça existe pas, forcément erreur
  // après on split le string qu'on a reçu du req avec la fonction split
  // le (" ") notionne un espace, le [1] forcement notionne le second objet de la string.
  // se souvenir de l'exemple d'antonin avec les "S"

  checkToken(req, res, next) {

    const authorization = req.headers.authorization; 
    if (!authorization) return res.sendStatus(403)
    const token = authorization.split(" ")[1]
    if (!token) return res.sendStatus(400)
    // le JWT verify sert à décoder le token
    // le decoded renvoi vers le token décodé.
    // dans le decoded on va chercher l'userId
    // puis dans l'user.id
    // wesh
    jwt.verify(token, "secret", function (err, decoded) {
      if (err) return res.sendStatus(403)
      let id = decoded.userId
      
      UserModel.findOne({
        _id: id
      }).then((dbRes) => {
        if (dbRes === null) return res.sendStatus(404)
        req.user = dbRes
        res.send(req.user);
      })
    })
  }
};

module.exports = users;
