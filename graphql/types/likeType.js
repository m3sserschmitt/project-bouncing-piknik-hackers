const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const postType = require('./postType');
const userType = require('./userType');

const LikeType = new GraphQLObjectType({
    name: 'Like',
    fields: {
        id: {
            type: GraphQLID
        },
        author: {
            type: userType,
            resolve: async like => await like.getUser()
        },
        postId: {
            type: GraphQLID,
        },
        createdAt: {
            type: GraphQLString,
            resolve: async post => post.createdAt.toLocaleString("en-US")
        }
    }
});

module.exports = LikeType;