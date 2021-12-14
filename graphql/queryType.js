const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');
const db = require('../models');

const userType = require('./types/userType');
const postType = require('./types/postType');

const {getAllUsers, getUserById} = require("../repository/user");
const {getAllPosts, getPostById} = require("../repository/post")

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {

        users: { // checked
            type: new GraphQLList(userType),
            resolve: async () => {
                return await getAllUsers();
            }
        },

        user: { // checked
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

        posts: { // checked
            type: new GraphQLList(postType),
            resolve: async () => {
                return await getAllPosts();
            }
        },

        post: { // checked
            type: postType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: async (source, { id }) => {
                return await getPostById(id);
            }
        },
    }
});

module.exports = queryType;