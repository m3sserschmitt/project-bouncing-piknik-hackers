const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { port } = require('./config/express');

const app = express();