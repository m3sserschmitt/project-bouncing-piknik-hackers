const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');

const loginInputType = require('./inputTypes/loginInputType'),
    loginResultType = require('./types/loginResultType'),
    { loginHandler } = require('../repository/login');

const userType = require('./types/userType'),
    createUserInputType = require('./inputTypes/createUserInputType'),
    updateUserInputType = require('./inputTypes/updateUserInputType'),
    { createUser, updateUser, deleteUser } = require('../repository/user');


const postType = require('./types/postType'),
    createPostInputType = require('./inputTypes/createPostInputType'),
    updatePostInputType = require('./inputTypes/updatePostInputType'),
    { createPost, updatePost, deletePost } = require('../repository/post');

const commentType = require('./types/commentType'),
    createCommentInputType = require('./inputTypes/createCommentInputType'),
    updateCommentInputType = require('./inputTypes/updateCommentInputType'),
    { createComment, updateComment, deleteComment } = require('../repository/comment');

const friendshipRequestType = require('./types/friendshipRequestType'),
    updateFriendshipRequestInputType = require('./inputTypes/updateFriendshipRequestInputType'),
    { createFriendshipRequest, updateFriendshipRequest } = require('../repository/friendshipRequest');

const eventType = require('./types/eventType.js'),
    createEventInputType = require('./inputTypes/createEventInputType'),
    updateEventInputType = require('./inputTypes/updateEventInputType'),
    { createEvent, updateEvent, deleteEvent } = require('../repository/event');

const LikeType = require('./types/likeType'),
    { createLike, deleteLike } = require('../repository/like');

const mutationType = new GraphQLObjectType({
    name: 'Mutation',

    fields: {

        login: {
            type: loginResultType,
            args: {
                loginInput: {
                    type: loginInputType
                },
            },
            resolve: async (_, { loginInput }) => {
                const token = await loginHandler(loginInput);
                return { token };
            }
        },

        createUser: {
            type: userType,
            args: {
                userInput: {
                    type: createUserInputType,
                }
            },
            resolve: async (_, { userInput }) => {

                return await createUser(userInput);
            }
        },

        updateUser: {
            type: userType,
            args: {
                updateUserInput: {
                    type: updateUserInputType,
                },
            },
            resolve: async (_, { updateUserInput }, { user }) => {

                return await updateUser(user, updateUserInput);
            }
        },

        deleteUser: {
            type: userType,
            args: {
                // request user password when deleting account, for better security
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (_, { password }, { user }) => {

                return await deleteUser(user, password);
            }
        },

        createPost: {
            type: postType,
            args: {
                createPostInput: {
                    type: createPostInputType
                }
            },
            resolve: async (_, { createPostInput }, { user }) => {

                return await createPost(user, createPostInput);
            }
        },

        updatePost: {
            type: postType,
            args: {
                updatePostInput: {
                    type: updatePostInputType
                }
            },
            resolve: async (_, { updatePostInput }, { user }) => {

                return await updatePost(user, updatePostInput);
            }
        },

        deletePost: {
            type: postType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { id }, { user }) => {

                return await deletePost(user, id);
            }
        },

        createEvent: {
            type: eventType,
            args: {
                createEventInput: {
                    type: createEventInputType
                }
            },
            resolve: async (_, { createEventInput }, { user }) => {

                return await createEvent(user, createEventInput);
            }
        },

        updateEvent: {
            type: eventType,
            args: {
                updateEventInput: {
                    type: updateEventInputType
                }
            },
            resolve: async (_, { updateEventInput }, { user }) => {

                return await updateEvent(user, updateEventInput);
            }
        },

        deleteEvent: {
            type: eventType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { id }, { user }) => {

                return await deleteEvent(user, id);
            }
        },

        createComment: {
            type: commentType,
            args: {
                createCommentInput: {
                    type: createCommentInputType
                }
            },
            resolve: async (_, { createCommentInput }, { user }) => {

                return await createComment(user, createCommentInput);
            }
        },

        updateComment: {
            type: commentType,
            args: {
                updateCommentInput: {
                    type: updateCommentInputType
                }
            },
            resolve: async (_, { updateCommentInput }, { user }) => await updateComment(user, updateCommentInput)
        },

        deleteComment: {
            type: commentType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { id }, { user }) => await deleteComment(user, id)
        },

        createLike: {
            type: LikeType,
            args: {
                postId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { postId }, { user }) => await createLike(user, postId)
        },

        deleteLike: {
            type: LikeType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { id }, { user }) => await deleteLike(user, id)
        },

        createFriendshipRequest: {
            type: friendshipRequestType,
            args: {
                receiverId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { receiverId }, { user }) => await createFriendshipRequest(user, receiverId)
        },

        updateFriendshipRequest: {
            type: friendshipRequestType,
            args: {
                updateFriendshipRequestInput: {
                    type: updateFriendshipRequestInputType
                }
            },
            resolve: async (_, { updateFriendshipRequestInput }, { user }) => await updateFriendshipRequest(user, updateFriendshipRequestInput)
        }
    },
});

module.exports = mutationType;