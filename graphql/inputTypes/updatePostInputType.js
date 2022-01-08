const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name: 'UpdatePostInput',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        text: { 
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        }
    }
});
