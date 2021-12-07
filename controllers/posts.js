const db = require('../models');

module.exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await db.Posts.findAll();
    res.send(allPosts);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}


module.exports.getPostsById = (req, res) => {
    const postsId = req.params.id;
    try{
        const posts = await db.Posts.findByPk({
            id: postsId,
        });
        res.send(posts);
    }catch (error) {
        console.error('Something went wrong');
        res.send({
          error: "Something went wrong",
        });
      } 
}

module.exports.createPosts = async (req, res) => {
  const {
        likes,
        photo,
        text
  } = req.body

  try {
    const newPosts = await db.Posts.create({
        likes,
        photo,
        text
    });

    res.status(201).send(newPosts);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}


module.exports.updatePosts = (req, res) => {
  
}


module.exports.deletePosts = (req, res) => {
  
}