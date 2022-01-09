const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id:{
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        birthDate: {
            type: GraphQLString,
            resolve: async user => user.birthDate.toLocaleDateString("en-US")
        },
        friendsNumber: {
            type: GraphQLString
        },
    }
});

module.exports = userType;