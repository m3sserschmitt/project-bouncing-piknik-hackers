const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, graphql } = require("graphql");

const createUserInputType = new GraphQLInputObjectType({
    name: 'createUserInput',
    fields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }
});

module.exports = createUserInputType;