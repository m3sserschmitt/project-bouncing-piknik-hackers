const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
} = require('graphql');

const userType = require('./userType');

module.exports = new GraphQLObjectType({
    name: 'Event',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        organizer: {
            type: userType,
            resolve: async (event) => {
                return await event.getUser();
            }
        },
        createdAt: {
            type: GraphQLString,
            resolve: async event => event.createdAt.toLocaleString("en-US")
        },
        modifiedAt: {
            type: GraphQLString,
            resolve: async event => event.updatedAt.toLocaleString("en-US")
        }
    }
});
