const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql');

const db = require('../../models');
const userType = require('./userType');

const friendshipRequestType = new GraphQLObjectType({
    name: 'FriendshipRequest',
    fields: {
        id: {
            type: GraphQLID
        },
        sender: {
            type: userType,
            resolve: async friendshipRequest => await db.User.findByPk(friendshipRequest.senderId)
        },
        receiver: {
            type: userType,
            resolve: async friendshipRequest => await db.User.findByPk(friendshipRequest.receiverId)
        },
        status: {
            type: GraphQLString
        }
    }
});

module.exports = friendshipRequestType;