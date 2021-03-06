const jwt = require('jsonwebtoken'),
    { MY_SECRET_KEY } = require('../config/jwt'),
    db = require('../models');


const authorizationMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;
    
    if (authorization) {
        try {
            const decoded = jwt.verify(authorization, MY_SECRET_KEY);
            const userId = decoded.id;

            const user = await db.User.findByPk(userId);

            if (user) {
                req.user = user;
                next();
            } else  {
                next();
            }
        } catch (e) {
            console.error('error', e)
            next();
        }
    } else {
        next();
    }
}

module.exports = authorizationMiddleware;