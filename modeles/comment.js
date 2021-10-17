const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
   comment:String,
   like:Number,
   currentUser:String,
   currentPost:Number
})

const CommentModel = mongoose.model("comment", CommentSchema)

module.exports = CommentModel;