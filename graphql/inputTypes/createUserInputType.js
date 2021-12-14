const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, graphql } = require("graphql");

const createUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
    }
});

module.exports = createUserInputType;