const jwt = require('jsonwebtoken'),
    secretKey = require('../config/jwt'),
    db = require('../models');


const loginHandler = async (email, password) => {
    const user = await db.User.findOne({
        where: {
            email,
            password
        }
    });

    if (user) {
        return jwt.sign({ id: user.id }, secretKey);
    } else {
        return null;
    }
}

module.exports = loginHandler;