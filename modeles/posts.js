const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    critic: String,
    comment: String,
    like: Number,
    pseudo: String
    
})

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;