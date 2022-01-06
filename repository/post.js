const db = require('../models');

// CREATE
module.exports.createPost = async (text, photo) => {
    try {
        const newPost = await db.Post.create({
            text,
            photo
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
        const allPosts = await db.Post.findAll();

        return allPosts;

    } catch (error) {
        console.error('Error on querying database for posts: ', error);
        return null;
    }
}

module.exports.getPostById = async (id) => {
    const postId = parseInt(id);

    try {
        const post = await db.Post.findByPk(postId);

        return post;

    } catch (error) {
        console.error('Error on querying database for post with provided id: ', error);
        return null;
    }
}