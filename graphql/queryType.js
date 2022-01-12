const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');
const db = require('../models');


const userType = require('./types/userType'),
    { getAllUsers, getUserById, getProfile } = require("../repository/user");

const postType = require('./types/postType'),
    { getAllPosts, getPostById } = require("../repository/post");

const commentType = require('./types/commentType'),
    { getComments, getComment } = require('../repository/comment');

const friendshipRequestType = require('./types/friendshipRequestType');
const { getFriendshipRequests, getFriendshipRequest } = require('../repository/friendshipRequest');

const eventType = require('./types/eventType'),
    { getAllEvents, getEventById } = require("../repository/event");

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {

        users: {
            type: new GraphQLList(userType),
            resolve: async () => {
                return await getAllUsers();
            }
        },

        user: {
            type: userType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (_, { id }) => {
                return await getUserById(id);
            }
        },

        profile: {
            type: userType,
            resolve: async (_, __, { user }) => await getProfile(user)
        },

        posts: {
            type: new GraphQLList(postType),
            resolve: async () => {
                return await getAllPosts();
            }
        },

        post: {
            type: postType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (_, { id }) => {
                return await getPostById(id);
            }
        },

        events: {
            type: new GraphQLList(eventType),
            resolve: async () => {
                return await getAllEvents();
            }
        },

        event: {
            type: eventType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (_, { id }) => {
                return await getEventById(id);
            }
        },

        comments: {
            type: new GraphQLList(commentType),
            args: {
                postId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { postId }) => await getComments(postId)
        },

        comment: {
            type: commentType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { id }) => await getComment(id)
        },

        friendshipRequests: {
            type: new GraphQLList(friendshipRequestType),
            resolve: async (_, __, { user }) => await getFriendshipRequests(user)
        },

        friendshipRequest: {
            type: friendshipRequestType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { id }, { user }) => await getFriendshipRequest(user, id)
        }
    }
});

module.exports = queryType;