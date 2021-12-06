const db = require('../models');

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.findAll();
    res.send(allUsers);
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}

// Return User
module.exports.getUserById = (req, res) => {
  
}

module.exports.createUser = async (req, res) => {
  const {
    name,
    birthDate,
    email,
    password,
    friendsNumber,
  } = req.body

  try {
    const newUser = await db.User.create({
        name,
        birthDate,
        email,
        password,
        friendsNumber,
    });

    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}

// Updated User
module.exports.updateUser = (req, res) => {
  
}

// Nothing
module.exports.deleteUser = (req, res) => {
  
}