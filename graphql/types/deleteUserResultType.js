const { GraphQLObjectType, GraphQLBoolean } = require("graphql");

const deleteUserResultType = new GraphQLObjectType({
    name: 'DeleteResultResult',
    fields: {
        status: {
            type: GraphQLBoolean
        },
    },
});

module.exports = deleteUserResultType;