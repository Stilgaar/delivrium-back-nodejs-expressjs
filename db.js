const mongoose = require('mongoose');
const users = require('./controlleurs/users');
const UserModel = require('./modeles/users');

const protocolMongo = "mongodb"
const hostMongo = "localhost"
const portMongo = "27017"
const nomdeMongo = "user"

const DB_URI = `${protocolMongo}://${hostMongo}:${portMongo}/${nomdeMongo}`

mongoose.connect(DB_URI).then(() => {
    console.log('*** CONNECTED TO DB FOR USER***')
    UserModel.insertMany(users).then(() => console.log("ENVOYER SUR LA DB")).catch(console.log)
})
