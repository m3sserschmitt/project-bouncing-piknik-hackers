const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        text: { 
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});
