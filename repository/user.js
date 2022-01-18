const db = require('../models');
const Permissions = require('../config/permissions');

// CREATE
module.exports.createUser = async ({ email, password, firstName, lastName, birthDate }) => {
    try {
        const newUser = await db.User.create({
            email,
            password,
            firstName,
            lastName,
            birthDate: new Date(birthDate)
        });

        return newUser;
    } catch (error) {
        console.log('Error on creating new user: ', error);
        return null;
    }
}

// READ
module.exports.getUserById = async (id) => {
    try {
        return await db.User.findByPk(id);

    } catch (error) {
        console.log('Error on querying database provided user id: ', error);

        return null;
    }
}

module.exports.getAllUsers = async () => {
    try {
        return await db.User.findAll();

    } catch (error) {

        console.error('Error on querying database for users: ', error);

        return null;
    }
}

module.exports.getProfile = async (user) => {

    if(!user)
    {
        return null;
    }

    try {

        return await db.User.findByPk(user.id);

    } catch (error)
    {
        console.log('Error on querying database for user profile: ', error);

        return null;
    }
}

// UPDATE
module.exports.updateUser = async (user, { email, password, firstName, lastName, birthDate }) => {

    // user must be authenticated in order to update his data
    const hasPermission = await user.can(Permissions.UPDATE_USER);

    if(!hasPermission) {
      return null;
    }
  
    const id = user.id;

    try {

        await db.User.update({
            email,
            password,
            firstName,
            lastName,
            birthDate
        }, {
            where:
            {
                id
            }
        });

        return await db.User.findByPk(id);

    } catch (error) {
        console.log('Error on updating user: ', error);
        return null;
    }
}

// DELETE
module.exports.deleteUser = async (user, password) => {
    
    // user must be authenticated to delete his account;
    if(!user)
    {
        return null;
    }
    
    try {

        const foundUser = await db.User.findOne({
            where: {
                id: user.id,
                password
            }
        });

        if(!foundUser)
        {
            return null;
        }

        await foundUser.destroy();

        return foundUser;
    } catch (error) {
        console.log('Error on deleting user: ', error);
        return null;
    }
}
