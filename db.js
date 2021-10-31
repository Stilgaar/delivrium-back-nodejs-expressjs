// ICI faut rien mettre yo
// la DB, faut s'y connecter qu'une fois, n'importe comment, vous en aurez rarement deux. 
// Antonin à fait faire des const pour l'écire plus vite, mais je me demande si ça n'irait pas plus vite de l'écrire simplement directement ? 
// n'oubliez pas mongoose et surtout n'oubliez pas de l'installer !

const mongoose = require('mongoose');
const protocolMongo = "mongodb"
const hostMongo = "localhost"
const portMongo = "27017"
const nomdeMongo = "user"

// le process.env.SCALINGO est le serveur distant sur lequel nous avons installé notre BD/back
// il est mis dans un process.env c'est un fichier caché que 

const DB_URI = process.env.MONGO_URL || `${protocolMongo}://${hostMongo}:${portMongo}/${nomdeMongo}`

mongoose.connect(DB_URI).then(() => {
    console.log('*** CONNECTED TO ***')
})
