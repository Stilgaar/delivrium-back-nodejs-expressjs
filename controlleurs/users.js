
// on utilise les modèles donc, on les invoque ici
const UserModel = require("../modeles/users");
// bcyrypt est le module de cryptage pour les mots de passe, il faut l'installer. Notez que c'est légalement obligatoire d'en avoir un
const bcrypt = require("bcrypt");
// c'est le nombre de fois que le mot de passe sera haché. 10 fois, c'est déjà pas mal
const saltRounds = 10;
// jwt est l'instance des tokens. Il faut également l'installer, il faut également l'invoquer
const jwt = require("jsonwebtoken");


// la const USERS est suivie de plusieurs fonctions. Nous les appelleront dans les différentes routes en tappant users.nomDeLaFonction

const users = {

 // le treatForm est la fonction qui va nous checker ce qui se pases quand on crée un compte

  treatForm(req, res, next) {

    // elle toppe les informations dans le body via le req.body
    // ce sont nos constantes d'état de notre signin.js dans le front (tout simplement)
    // le signin in fetch ça en POST dans le back
    // c'est ici que ça arrive

    let { pseudo, email, password, verifPassword } = req.body;

    if (!pseudo || !email || !password || !verifPassword) { // elle check si les champs sont remplis
      return res.sendStatus(400); // si c'est pas le cas, erreur 400 
      // notez qu'il y aurait possibilité de prévenir l'utilisateur de ça avec un if(res.status === 400){alert("attention faut remplir tous les champs")}
    }

    if (password !== verifPassword) { // on verifie également que les mots de passe correspondent. Attention on fait ça dans le back AVANT
      // de le hasher, sinon ça peut ralentir pas mal les serveurs pour rien
       return res.sendStatus(400).send("Les mots de passe de correspondent pas"); // comme pour le if d'au dessus on pourrait prévenir l'user
       // si ses MDP ne matchent pas (en changeant le sendStatus par un 401 par exemple ?)
    }

    // après on check si l'email n'est pas déjà dans la BDD, pour pas que les utilisateur puissent se crée plusieurs comptes avec le même email
    // on est pas skype quand même
    return UserModel.findOne({ email: email }).then((alreadyExistingUser) => {

      // si donc il n'existe pas de user, on hash direct le mot de passe
      // notez que c'est comme ça que s'écris la fonction bycrypt, elle choppe le mpd (password) et lui fous les saltRound qu'on a déclaré plus haut
      if (alreadyExistingUser === null) {
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        // puis on utilise notre modele de modeles/users pour l'injecter dans notre bd
        // noter qu'une fois qu'on utilies l'USERMODEL ça part dans la BDD vu qu'on est dans une situation de POST
        // notez aussi que le create est une fonction existante dans mangoose, c'est ce qui lui indique quoi faire
        // et yen a une liste pas croyable !
        return UserModel.create({
          pseudo,
          email,
          password: hashedPassword,
        }).then((createdUser) => {
          console.log(createdUser);
          return res.status(200).send(createdUser);
        });
      } // si le if ne marche pas là haut, c'est ici qu'il retombe, en erreur 400
      return res.status(400).send("Email déjà existant");
    });
  },

  // même fonction que pour get, sauf que déjà c'est pour le login
  treatLogin(req, res, next) {
    let { pseudo, password } = req.body;

    if (!pseudo || !password) {
      return res.sendStatus(400); // ici encore un fois on check s'il y a un mdp ou un pseudo dans les cases.
    } // notez encore une fois qu'on pourrait facilement faire une alerte coté front si ce n'est pas le cas

    // la pour la fonction mangoose, on ne crée plus, on findOne, effectivement vu que nous utilisions des pseudo uniques sur le site
    // (ah après avoir checké, nous utilisions que des mail uniques, faudra penser à réctifier ça ....)
    // il check si le pseudo est dans la base de données
    UserModel.findOne({
      pseudo: pseudo,
    }).then((user) => {
      //Si l'entrée est valide fais ça

      if (user === null) {
        console.log("user doesn't exists");
        return res.status(404).send("Le compte n'existe pas");
      } // si ça existe pas il envoi des erreures au front. ici on fait du 404 parce que c'est la faute de l'user
      let isSamePassword = bcrypt.compareSync(password, user.password);
      // après on check, encore une fois avec bycrypt que le password est le même que celui que l'utilisateur à rentré
      // encore une fois le "compareSync" est une fonction de bycrypt, lui aussi en a pas mal en stock

      // si le mdp est pas le bon, bha 404 ma gueule
      if (!isSamePassword) {
        console.log("Mauvais mdp, fdp");
        return res.status(404).send({ error: "Mauvais mot de passe" });
      }

      // après pendant le login, bha il crée un token avec JWT (c'est le truc qu'on a importé plus haut)
      // nous créons donc le token
      const token = jwt.sign(
        { // nos le faisons en fonction de l'userID (que nous appellons userId depuis l'user._id, facile ...)
          userId: user._id,
        },
        "secret", // ça c'est notre clefs pourrie de JWT, l'idéal c'est d'en faire une variable, un peu plus costeau pour ensuite la mettre dans un .env
        { expiresIn: "24h" } // le token dure que 24h. Je ne sais pas trop comment ça marche vu que c'est une string, mais ça doit être un truc
      ); // de jwt. Parfois l'ignorance, c'est pas mal
      console.log(token + " Voilà le log");

      res
        .status(200) // si tout ça fonctionne on envoi la répones au front, et on est connecté. C'est beau la technologie. 
        // d'ailleurs ce status 200 c'est celui que je récupéré dans login.js dans le front pour faire mon 
        // if(res.status === 200) {setIsLog(true)}. La nature est quand même bien faite !
        .json({ token: token, message: "connection réussie", user });
    });
  },


  // La j'ai deux fonctions, je ne sais même plus ce qu'elles font. Enfin si je vois ce qu'elle font, mais sont elles vraiment utilises ? 
  // ça me parait bien trop court pour que ce soit vrai
  treatUserId(req, res, next) {
    let id = req.body._id;
  },

  // controleur à utliliser (je suppose)
  getInfos(req, res, next) {
    console.log(req.body)
    res.send(req.user);
  },

  // la fonction BALAIZE qui check le token en place ... 
  // fait avec l'aide d'ANTONIN. 
  // comme si j'avais 3 ans

  checkToken(req, res, next) {

    const authorization = req.headers.authorization; // attention cette authorisation faut l'envoyer du FRONT ! sinon il la récup pas dans le body
    // le req.headers.authorization toppe les infos 'bearer token'
    if (!authorization) return res.sendStatus(403) // ouais je m'en suis rendu compte à mes dépends ... ça m'a pris presque un jour ... 
      // le if !authorisation check si ça existe, si ça existe pas, forcément erreur
    const token = authorization.split(" ")[1] 
    // après on split le string qu'on a reçu du req avec la fonction split
    // le (" ") notionne un espace, le [1] forcement notionne le second objet de la string.
    // se souvenir de l'exemple d'antonin avec les "S" (désolé si tu lis ça et que t'étais pas là)
    if (!token) return res.sendStatus(400)
  
    jwt.verify(token, "secret", function (err, decoded) { // le JWT verify sert à décoder le token //  le decoded renvoi vers le token décodé.
      if (err) return res.sendStatus(403)
      let id = decoded.userId // dans le decoded on va chercher l'userId
      // puis dans l'user.id
      // ensuite on fait un findOne pour le chopper parmi les ID
      UserModel.findOne({
        _id: id
      }).then((dbRes) => {
        if (dbRes === null) return res.sendStatus(404)
        req.user = dbRes
        res.send(req.user); // la réponse est ensuite envoyé dans le front ou on peut récupérer les informations de l'user grâce à son token
      }) // j'avoue celle là, même en la relisant, je la trouve BALAIZE
    })
  }
};

module.exports = users;
