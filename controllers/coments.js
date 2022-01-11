const db = require('../models');

module.exports.getAllComments = async (req, res) => {
  try {
    const allComments = await db.Comment.findAll();
    res.send(allComments);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}


module.exports.getCommentsById = (req, res) => {
    const commentsId = req.params.id;
    try{
        const comments = await db.Comments.findByPk({
            id: commentsId,
        });
        res.send(comments);
    }catch (error) {
        console.error('Something went wrong');
        res.send({
          error: "Something went wrong",
        });
      } 
}

module.exports.createComments = async (req, res) => {
  const {
        text
  } = req.body

  try {
    const newComments = await db.Comment.create({
        text
    });

    res.status(201).send(newComments);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}


module.exports.updateComments = (req, res) => {
  
}


module.exports.deleteComments = (req, res) => {
  
}