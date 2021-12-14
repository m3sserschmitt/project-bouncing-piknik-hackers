const jwt = require('jsonwebtoken'),
    { MY_SECRET_KEY } = require('../config/jwt'),
    db = require('../models');


const loginHandler = async ({ email, password }) => {
    const user = await db.User.findOne({
        where: {
            email,
            password
        }
    });

    if (user) {
        const token = jwt.sign({
            id: user.id,
          }, MY_SECRET_KEY);
        return token;
    } else {
        return null;
    }
}

module.exports = loginHandler;