const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    critic: String,
    title: String,
    comment: String,
    like: Number
    
})

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;