const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name: 'UpdateEventInput',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: { 
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        }
    }
});