// Utilisation des modèles dans le BACK
// c'est ce qui va nous aider à envoyer les données dans Mongo. 
// Notez que ça ressemble étrangement à nos jolis constructeurs de dans le Js vanilla. Je savais qu'on allait s'en resservir un jour
// notez aussi qu'en dehors de ces trois datas, si nous essayons d'en envoyer une (par exemple : age: number) sans l'avoir rajouté au préalable ici,
// cela ne fonctionnera pas. 
// Du coup il faut penser grand dés le début, pour que tous les utilisateurs puissent s'update au fur et a mesure que vous faites des updates
// par exemple si vous voulez rajouter par la suite une option pour add une adresse, add l'age, add des infos bancaire (niark niark) bha prévoyez ça dés le départ
// si vous avez 10.000 users, et que vous voulez par la suite leurs demander leurs age, faudra qu'ils créent un autre compte. 
// c'est con, mais c'est comme ça que fontctionne mongo. 
// après yora ptet des techniques pour changer ça, mais je ne les connais pas.


const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    critic: String,
    currentUser:String,
    currentPost:String
})

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;