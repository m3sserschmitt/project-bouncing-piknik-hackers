const { GraphQLInputObjectType, GraphQLString } = require("graphql");

const updateUserInputType = new GraphQLInputObjectType({
    name: 'UpdateUserInput',
    fields: {
        email: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        birthDate: {
            type: GraphQLString
        }
    }
});

module.exports = updateUserInputType;