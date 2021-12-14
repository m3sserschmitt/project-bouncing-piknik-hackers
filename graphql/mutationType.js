const {
    GraphQLObjectType, GraphQLString, GraphQLNonNull,
} = require('graphql');

//const { extendSchemaImpl } = require('graphql/utilities/extendSchema');

const loginHandler = require('../repository/login');
const { createUser, updateUser } = require('../repository/user');

const createUserInputType = require('./inputTypes/createUserInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');

const loginInputType = require('./inputTypes/loginInputType');

const loginResultType = require('./types/loginResultType');
const userType = require('./types/userType');

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
                userInput: {
                    type: updateUserInputType,
                },
            },
            resolve: async (_, { userInput }, { user }) => {

                // check if user is authenticated
                if (!user) {
                    return null;
                }

                return await updateUser(user.id, userInput);
            }
        }
    },
});

module.exports = mutationType;