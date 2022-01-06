const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const createPostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        text: new GraphQLNonNull(GraphQLString),
        photo: GraphQLString
    }
});

module.exports = createPostInputType;