const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = require('graphql');

const loginHandler = require('../repository/login');

const { createUser, updateUser, deleteUser } = require('../repository/user');

const createUserInputType = require('./inputTypes/createUserInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');

const loginInputType = require('./inputTypes/loginInputType');

const loginResultType = require('./types/loginResultType');
const userType = require('./types/userType');
const deleteUserResultType = require('./types/deleteUserResultType')


const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        login: { // checked
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

        createUser: { // checked
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

        updateUser: {  // checked
            type: userType,
            args: {
                updateUserInput: {
                    type: updateUserInputType,
                },
            },
            resolve: async (_, { updateUserInput }, { user }) => {

                // check if user is authenticated
                if (!user) {
                    return null;
                }

                return await updateUser(user.id, updateUserInput);
            }
        },

        deleteUser: { // checked
            type: userType,
            args: {
                userPassword: {
                    type: GraphQLString
                }
            },
            resolve: async (_, __, { user }) => {

                // only authenticated users can delete their account
                if (!user) {
                    return null;
                }

                return await deleteUser(user.id);
            }
        }
    },
});

module.exports = mutationType;