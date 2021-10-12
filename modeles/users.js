const mongoose = require('mongoose');

// const commentaire = require('../controlleurs/commentaire');
const UserSchema = mongoose.Schema({
    pseudo: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;