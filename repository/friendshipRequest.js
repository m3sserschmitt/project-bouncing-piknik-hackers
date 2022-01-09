const db = require('../models');
const Op = require('sequelize').Op;

// CREATE
module.exports.createFriendshipRequest = async (user, receiverId) => {

    // only authenticated users can send requests;
    if (!user) {
        return null;
    }

    // user cannot request friendship to himself
    if (user.id == receiverId) {
        return null;
    }

    try {

        const filterCondition = {
            [Op.or]: [
                {
                    [Op.and]: [
                        {
                            senderId: {
                                [Op.eq]: [
                                    receiverId
                                ]
                            }
                        },
                        {
                            receiverId: {
                                [Op.eq]: [
                                    user.id
                                ]
                            }
                        }
                    ]
                },
                {
                    [Op.and]: [
                        {
                            senderId: {
                                [Op.eq]: [
                                    user.id
                                ]
                            }
                        },
                        {
                            receiverId: {
                                [Op.eq]: [
                                    receiverId
                                ]
                            }
                        }
                    ]
                }
            ]
        };

        return await db.Friendship.findOne({ where: filterCondition })
            .then(foundRequest => {
                if (!foundRequest) {
                    return db.Friendship.create({
                        senderId: user.id,
                        receiverId
                    })
                }
            });

    } catch (error) {

        console.log('Error on creating friendship request: ', error);

        return null;
    }
}

// READ
module.exports.getFriendshipRequests = async (user) => {

    if (!user) {
        return null;
    }

    try {

        return await db.Friendship.findAll(
            {
                where: {
                    receiverId: user.id
                }
            });

    } catch (error) {

        console.log('Error on querying database for friendship requests: ', error);

        return null;
    }
}

module.exports.getFriendshipRequest = async (user, id) => {

    if (!user) {
        return null;
    }

    try {

        return await db.Friendship.findOne(
            {
                where: {
                    id,
                    receiverId: user.id
                }
            }
        )

    } catch (error) {
        console.log('Error on querying database for friendship request: ', error);

        return null;
    }
}

// UPDATE
module.exports.updateUsersFriendsNumber = async (friendshipRequest) => db.User.findAll({
    where: {
        [Op.or]: [
            {
                id: {
                    [Op.eq]: [friendshipRequest.senderId]
                }
            },
            {
                id: {
                    [Op.eq]: [friendshipRequest.receiverId]
                }
            }
        ]
    }
}).then(users => {
    if (users) {
        users.forEach(user => {
            
            if (friendshipRequest.status == "accepted") {
                user.friendsNumber += 1;
            } else if (friendshipRequest.status == "declined" && user.friendsNumber > 0) {
                user.friendsNumber -= 1;
            }

            user.save();
        })
    }
});


module.exports.updateFriendshipRequest = async (user, { id, status }) => {

    if (!user) {
        return null;
    }

    try {

        // only request sender and receiver can make changes
        const friendshipRequest = await db.Friendship.findOne({
            where: {
                id,
                [Op.or]: [
                    {
                        receiverId: {
                            [Op.eq]: [user.id]
                        }
                    },
                    {
                        senderId: {
                            [Op.eq]: [user.id]
                        }
                    }
                ]
            }
        });

        // if no request found, terminate
        if (!friendshipRequest) {
            return null;
        }

        // change request status
        friendshipRequest.status = status;

        if (status == "declined") {
            // if friendship request is declined, then there is no reason
            // to keep this record into database anymore
            await friendshipRequest.destroy();

        } else if (status == "accepted") {
            // otherwise, friendship request is saved into database into "accepted" state
            await friendshipRequest.save();
        }

        // finally, update users friends number accordingly
        await this.updateUsersFriendsNumber(friendshipRequest);

        return friendshipRequest;

    } catch (error) {
        console.log('Error on updating friendship request: ', error);

        return null;
    }
}
