const db = require('../models');

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.Users.findAll();
    res.send(allUsers);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}

// Return Users
module.exports.getUsersById = (req, res) => {
  
}

module.exports.createUsers = async (req, res) => {
  const {
    name,
    birthDate,
    email,
    password,
    friendsNumber,
  } = req.body

  try {
    const newUsers = await db.Users.create({
        name,
        birthDate,
        email,
        password,
        friendsNumber,
    });

    res.status(201).send(newUsers);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}


module.exports.updateUsers = (req, res) => {
  
}


module.exports.deleteUsers = (req, res) => {
  
}