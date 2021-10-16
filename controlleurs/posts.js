const PostModel = require('../modeles/posts')

// nos controlleurs dans le back
// notez que nous les avons fait BIEN après celles des users donc c'est devenu un peu plus facile à ce moment là
// à y jeter un coup d'oeil, je me dit que si vous comprennez ce qui s'est passé dans USERS.js dans les controlleurs, c'est pas utile que je commente trop celui là

const posts = {

    newPost(req, res, next) {

        let { title, critic, currentUser, currentPost } = req.body // ici le currentUser est récupéré via notre modèle users.js, récupéré dans le front quand on clique sur la page 
        // ça nous permet de savoir qui à écris quoi. Du coup par contre nous la sauvagardons dans l'autre collection. Franchement jusque là, c'est ce qu'on a trouvé de plus simple
        // c'est d'ailleurs pour ça que nous avons décodé le token dans users.hs =)

        if (!title | !critic) { // pas besoin de checker le currentUser, nous sommes sur une route privée, l'user à forcément un token de connection
            return res.sendStatus(400)
        }

        PostModel.create({
            title: title,
            critic: critic,
            currentUser: currentUser,
            currentPost: currentPost
        }).then((createdPost) => {
            res.send(createdPost)
        })

    },

    // la même fonction pour les commentaires. Nous ne l'avons pas encore fini. 
    // l'idéal c'est également d'avoir le currentUser pour pouvoir les render plus facilement par la suite

    newComment(req, res, next) {

        let { comment, currentUser } = req.body // ou --->   let comment = req.body.comment

        if (!comment) {
            return res.sendStatus(400)
        }
            PostModel.updateOne({
                _id:postId,
            comment: comment,
            currentUser: currentUser,
        }).then((createdComment) => {
            res.send(createdComment)
        })
    },

    // getcrits est la fonction nous permettant de récupérer toutes les critiques pour la page de garde.
    // notez qu'on aura une getComms par la suite aussi pour pouvoir afficher les commentaires sur la page des crits. 

    getCrits(req, res, next) {
        PostModel.find({
        }).then((critics) => {
            res.send(critics)
        })
    },

    getCritID(req, res, next)  {
        PostModel.findOne({
            _id
        }).then((resId) => {
            res.send(resId)
        })
    }
};



module.exports = posts;