const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const userType = require('./userType'),
    likeType = require('./likeType'),
    commentType = require('./commentType');

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        },
        author: {
            type: userType,
            resolve: async post => await post.getUser()
        },
        likes: {
            type: new GraphQLList(likeType),
            resolve: async post => await post.getLikes()
        },
        comments: {
            type: new GraphQLList(commentType),
            resolve: async post => await post.getComments()
        },
        createdAt: {
            type: GraphQLString,
            resolve: async post => post.createdAt.toLocaleString("en-US")
        },
        modifiedAt: {
            type: GraphQLString,
            resolve: async post => post.updatedAt.toLocaleString("en-US")
        }
    }
});

module.exports = postType;