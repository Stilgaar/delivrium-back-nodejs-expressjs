const PostModel = require('../modeles/posts')

const posts = {

    newPost(req, res, next) {

        let {title, critic} = req.body
        let pseudo = req.body.pseudo

        if (!title | !critic) {
            return res.sendStatus(400)
        }

        PostModel.create({
            title: title,
            critic: critic,
            pseudo: pseudo
        }).then((createdPost) => {
            res.send(createdPost)
        })

    },

    newComment(req, res, next) {

        let {comment} = req.body // ou --->   let comment = req.body.comment

        if (!comment) {
            return res.sendStatus(400)
        }

        PostModel.create({
            comment: comment
        }).then((createdComment) => {
            res.send(createdComment)
        })

    }


}

module.exports = posts;