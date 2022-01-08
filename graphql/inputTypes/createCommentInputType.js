const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name: 'CreateCommentInput',
    fields: {
        postId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        text: { 
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});
