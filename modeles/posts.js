const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    critic: String,
    comment: String,
    like: Number,
    
})

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;