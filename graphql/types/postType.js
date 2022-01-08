const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const userType = require('./userType'),
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
            resolve: async (post) => await post.getUser()

        },
        likes: {
            type: GraphQLInt
        },
        comments: {
            type: new GraphQLList(commentType),
            resolve: async (post) => post.getComments()
        }
    }
});

module.exports = postType;