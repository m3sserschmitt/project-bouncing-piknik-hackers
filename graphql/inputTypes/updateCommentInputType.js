const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name: 'UpdateCommentInput',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        text: { 
            type: GraphQLString
        }
    }
});
