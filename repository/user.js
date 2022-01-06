const db = require('../models');

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
        const user = await db.User.findByPk(id);

        return user;

    } catch (error) {
        console.log('Error on querying database provided user id: ', error);

        return null;
    }
}

module.exports.getAllUsers = async () => {
    try {
        const allUsers = await db.User.findAll();

        return allUsers;

    } catch (error) {

        console.error('Error on querying database for users: ', error);

        return null;
    }
}

// UPDATE
module.exports.updateUser = async (userId, { email, password, firstName, lastName, birthDate }) => {
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
                id: userId
            }
        });

        return await db.User.findByPk(userId);

    } catch (error) {
        console.log('Error on updating user: ', error);
        return null;
    }
}

// DELETE
module.exports.deleteUser = async userId => {
    try {

        let user = await db.User.findByPk(userId);

        if(!user)
        {
            return null;
        }

        user.destroy();

        return user;
    } catch (error) {
        console.log('Error on deleting user: ', error);
        return null;
    }
}