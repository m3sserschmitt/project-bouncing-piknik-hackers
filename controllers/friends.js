const db = require('../models');

module.exports.getAllFriends = async (req, res) => {
  try {
    const allFriends = await db.Friends.findAll();
    res.send(allFriends);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}


module.exports.getFriendsById = (req, res) => {
    const friendsId = req.params.id;
    try{
        const friends = await db.Friends.findByPk({
            id: friendsId,
        });
        res.send(friends);
    }catch (error) {
        console.error('Something went wrong');
        res.send({
          error: "Something went wrong",
        });
      } 
}

module.exports.createFriends = async (req, res) => {
  const {
        name,
  } = req.body

  try {
    const newFriends = await db.Friends.create({
        name,
    });

    res.status(201).send(newFriends);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}


module.exports.updateFriends = (req, res) => {
  
}


module.exports.deleteFriends = (req, res) => {
  
}