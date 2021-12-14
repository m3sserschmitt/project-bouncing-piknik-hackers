const db = require('../models');

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