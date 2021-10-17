const CommentModel = require('../modeles/comment')

const comment = {

    newCom(req, res, next) {

        let {comment, currentUser, currentPost} = req.body
        if(!comment){return res.sendStatus(400)}

        CommentModel.create({
            currentPost,
            currentUser,
            comment,
        }).then((createdCom) => {
            res.send(createdCom)
        })
    },

    getCom(req, res, next) {
        CommentModel.find({
        }).then((coms) => {
            res.send(coms)
        })
    },
   
   
}

module.exports = comment; 