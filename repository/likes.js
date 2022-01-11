const db = require('../models');

// CREATE
module.exports.createLike = async (user, postId ) => {

    // only authenticated users can like;
    if (!user) {
        return null;
    }

    try {

        const newLike = await db.Like.create({
            postId,
            userId: user.id,
        });

        return newLike;

    } catch (error) {

        console.log('Error on liking post: ', error);
        return null;
    }
}
//READ 
module.exports.getLikes = async (postId) => {

    try {

        return await db.Like.findAll({
            where: {
                postId
            }
        });

    } catch (error) {

        console.log('Error on querying database for likes: ', error);

        return null;
    }
}

module.exports.getLike = async (id) => {

    try {

        return await db.Like.findByPk(id);

    } catch (error) {

        console.log('Error on querying database for like: ', error);
        return null;
    }
}
// DELETE
module.exports.deleteLike = async (user, id) => {

    if(!user)
    {
        return null;
    }

    try {

        const like = await db.Like.findOne({
            where: {
                id,
                userId: user.id
            }
        })

        if(!like)
        {
            return null;
        }

        await like.destroy();

        return like;

    } catch (error) {

        console.log('Error on unliking post: ', error);
    }
}
