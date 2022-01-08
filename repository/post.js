const db = require('../models');

// CREATE
module.exports.createPost = async (user, { text, title }) => {

    // user must be authenticated to create posts
    if (!user) {
        return null;
    }

    try {
        const newPost = await db.Post.create({
            userId: user.id,
            text,
            title
        });

        return newPost;
    } catch (error) {

        console.log('Error on creating new post: ', error);
        return null;
    }
}

// READ
module.exports.getAllPosts = async () => {
    try {
        return await db.Post.findAll();

    } catch (error) {
        console.error('Error on querying database for posts: ', error);
        return null;
    }
}

module.exports.getPostById = async (id) => {
    try {
        return await db.Post.findByPk(id);

    } catch (error) {
        console.error('Error on querying database for post with provided id: ', error);
        return null;
    }
}

//UPDATE
module.exports.updatePost = async (user, { id, title, text }) => {

    // only authenticated users can update their posts
    if (!user) {
        return null;
    }

    try {

        await db.Post.update({
            title,
            text
        }, {
            where: {
                id
            }
        });

        return db.Post.findByPk(id);

    } catch (error) {
        console.log('Error on updating post with provided id: ', error);
        return null;
    }
}

// DELETE
module.exports.deletePost = async (user, postId) => {

    // only authenticated users can delete their posts
    if (!user) {
        return null;
    }

    try {
        const post = await db.Post.findByPk(postId);

        if (!post) {
            return null;
        }

        await post.destroy();

        return post;
    } catch (error) {

        console.log('Error on deleting post: ', error);
        return null;
    }
}
