const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, graphql } = require("graphql");

const updateUserInputType = new GraphQLInputObjectType({
    name: 'updateUserInput',
    fields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
            type: GraphQLString
        },
        lasttName: {
            type: GraphQLString
        },
        birthDate: {
            type: GraphQLString
        }
    }
});

module.exports = updateUserInputType;