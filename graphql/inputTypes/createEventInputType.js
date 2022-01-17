const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name: 'CreateEventInput',
    fields: {
        name: { 
            type: new GraphQLNonNull(GraphQLString)
        },
        address: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        },
        startDate: {
            type: new GraphQLNonNull(GraphQLString)
        },
        endDate: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});
