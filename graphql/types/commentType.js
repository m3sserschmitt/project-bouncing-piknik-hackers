const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
} = require('graphql');

const userType = require('./userType');

module.exports = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: {
            type: GraphQLID
        },
        postId: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        },
        likes: {
            type: GraphQLInt
        },
        author: {
            type: userType,
            resolve: async (comment) => {
                return await comment.getUser();
            }
        },
        createdAt: {
            type: GraphQLString,
            resolve: async comment => comment.createdAt.toLocaleString("en-US")
        },
        modifiedAt: {
            type: GraphQLString,
            resolve: async comment => comment.updatedAt.toLocaleString("en-US")
        }
    }
});
