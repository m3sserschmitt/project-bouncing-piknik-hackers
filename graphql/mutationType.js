const {
    GraphQLObjectType, GraphQLString, GraphQLNonNull,
} =require('graphql');
const { extendSchemaImpl } = require('graphql/utilities/extendSchema');
const loginHandler = require('../repository/login');
const createUserInputType = require('./inputTypes/createUserInputType');
const updateUserInputType = require('./inputTypes/updateUserInputType');

const loginInputType = require('./inputTypes/loginInputType');
const loginType = require('./types/loginType');
const userType = require('./types/userType');
const db = require('../models');
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        login: {
            type: loginType,
            args: {
                loginInput: {
                    type: loginInputType
                },
            },
            resolve: (source, args) => {
                const {email, password} = args.loginInput;
                console.log('email', email);
                console.log('pass', password);
                const token = loginHandler(email, password)
                return {
                    token,
                }
            }
        },
        createUser: {
            type: userType,
            args: {
                createUserInput: {
                    type: createUserInputType,
                }
            },
            resolve: async (source,args)=> {
                const {email, password,firstName,lastName} = args.createUserInput;
                
                try {
                    const newUser = await db.User.create({
                        email,
                        password,
                        firstName,
                        lastName,
                    });

                    return newUser;

                } catch (error) {
                    console.error(error);
                    return null;
                }

            }
        },
        updateUser: {
            type: userType,
            args: {
                updateUserInput: {
                    type: updateUserInputType,
                },
            },
            resolve: async (source,args,{user}) => {
                if(!user){
                    return null; 
                }
                const {id} = user;
                const { email, firstName, lastName} = args.updateUserInput;
                try {
                    await db.User.update({
                        email, 
                        firstName,
                        lastName,
                    }, {where: {id}});

                    return await db.User.findByPk(id);

                }catch(e){
                    console.error(e);
                    return null;
                }
                {

                }
            }
        }
    },
});

module.exports = mutationType;