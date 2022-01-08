const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');

const { loginHandler } = require('../repository/login');
const loginInputType = require('./inputTypes/loginInputType');
const loginResultType = require('./types/loginResultType');


const { createUser, updateUser, deleteUser } = require('../repository/user');
const userType = require('./types/userType');
const createUserInputType = require('./inputTypes/createUserInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');


const { createPost, updatePost, deletePost } = require('../repository/post');
const postType = require('./types/postType');
const createPostInputType = require('./inputTypes/createPostInputType');
const updatePostInputType = require('./inputTypes/updatePostInputType');


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
        }
    },
});

module.exports = mutationType;