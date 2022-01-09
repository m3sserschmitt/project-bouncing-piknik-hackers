const { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLEnumType } = require("graphql");


const updateFriendshipRequestStatusEnumType = new GraphQLEnumType({
    name: 'UpdateFriendshipRequestStatusEnum',
    values: {
        declined: {
            value: "declined"
        },
        accepted: {
            value: "accepted"
        }
    }
});

module.exports = new GraphQLInputObjectType({
    name: 'UpdateFriendshipRequestInput',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        status: { 
            type: new GraphQLNonNull(updateFriendshipRequestStatusEnumType)
        }
    }
});
