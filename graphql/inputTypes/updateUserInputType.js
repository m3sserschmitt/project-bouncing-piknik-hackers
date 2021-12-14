const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, graphql } = require("graphql");

const updateUserInputType = new GraphQLInputObjectType({
    name: 'UpdateUserInput',
    fields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
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