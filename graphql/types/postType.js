const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');
const userType = require('./userType');

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {
            type: GraphQLID
        },
        likes: {
            type: GraphQLInt
        },
        photo: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        },
        author: {
            type: userType,
            resolve: async (post) => {
                return await post.getUser();
            }
        }
    }
});

module.exports = postType;