const {
    GraphQLObjectType,
    GraphQLString,
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
            type: GraphQLString
        },
        photo: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        },
        author: {
            type: userType,
            resolve: async (source) => {
                return await source.getUser();
            }
        }
    }
});

module.exports = postType;