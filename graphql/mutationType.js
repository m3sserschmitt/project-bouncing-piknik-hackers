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
                userPassword: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (_, { userPassword }, { user }) => {

                return await deleteUser(user, userPassword);
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
                postId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { postId }, { user }) => {

                return await deletePost(user, postId);
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
                commentId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { commentId }, { user }) => await deleteComment(user, commentId)
        }
    },
});

module.exports = mutationType;