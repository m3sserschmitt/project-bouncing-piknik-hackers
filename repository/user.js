const db = require('../models');

module.exports.getAllUsers = async () => {
    try {
        const allUsers = await db.User.findAll();

        return allUsers;

      } catch (error) {

        console.error('Error on querying database for users', error);

        return null;
      } 
}

module.exports.createUser = async ({ email, password, firstName, lastName }) => {
    try {
        const newUser = await db.User.create({
            email,
            password,
            firstName,
            lastName
        });

        return newUser;
    } catch (error) {
        console.log('Error on creating new user: ', error);
        return null;
    }
}

module.exports.getUserById = async (id) => {
    try {
        const user = await db.User.findByPk(id);

        return user;

    } catch (error) {
        console.log('Error on querying database provided user id: ', error);

        return null;
    }
}

module.exports.updateUser = async (userId, { email, password, firstName, lastName, birthDate }) => {

    // we need to update only those properties which are not null
    // const nonNullProperties = Object.entries({ email, password, firstName, lastName, birthDate })
    //     .filter(([userProperty, propertyValue]) => propertyValue !== null && propertyValue !== undefined)
    //     .map(([userProperty, propertyValue]) => [userProperty, propertyValue]);

    // const nonNullUserProperties = Object.fromEntries(nonNullProperties);

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
        console.log('Error on updating user', error);
        return null;
    }

    return null;
}
