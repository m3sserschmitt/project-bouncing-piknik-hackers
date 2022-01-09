const db = require('../models');

// CREATE
module.exports.createComment = async (user, { postId, text }) => {

    // only authenticated users can comment;
    if (!user) {
        return null;
    }

    try {

        const newComment = await db.Comment.create({
            postId,
            userId: user.id,
            text
        });

        return newComment;

    } catch (error) {

        console.log('Error on creating comment: ', error);
        return null;
    }
}

//READ 
module.exports.getComments = async (postId) => {

    try {

        return await db.Comment.findAll({
            where: {
                postId
            }
        });

    } catch (error) {

        console.log('Error on querying database for comments: ', error);

        return null;
    }
}

module.exports.getComment = async (id) => {

    try {

        return await db.Comment.findByPk(id);

    } catch (error) {

        console.log('Error on querying database for comment: ', error);
        return null;
    }
}

// UPDATE
module.exports.updateComment = async (user, {id, text}) => {

    if(!user)
    {
        return null;
    }

    try {

        await db.Comment.update({
            text
        }, {
            where: {
                id,
                userId: user.id
            }
        })

        return await db.Comment.findOne({
            where: {
                id,
                userId: user.id
            }
        });

    } catch (error) {

        console.log('Error on updating comment: ', error);

        return null;
    }
}

// DELETE
module.exports.deleteComment = async (user, id) => {

    if(!user)
    {
        return null;
    }

    try {

        const comment = await db.Comment.findOne({
            where: {
                id,
                userId: user.id
            }
        })

        if(!comment)
        {
            return null;
        }

        await comment.destroy();

        return comment;

    } catch (error) {

        console.log('Error on deleting comment: ', error);
    }
}
