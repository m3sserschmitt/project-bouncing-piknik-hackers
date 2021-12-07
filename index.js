const express = require('express');
const bodyParser = require('body-parser');

const handleGreeting = require('./controllers/greeting');
const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require('./controllers/login');
const { getAllUsers, getUsersById, createUsers, updateUsers, deleteUsers } = require('./controllers/users');
const { getAllPosts, getPostsById, createPosts, updatePosts, deletePosts } = require('./controllers/posts');

const app = express();
app.use(bodyParser.json());




app.get("/users", getAllUsers);
app.get("/users/:id", getUsersById);
app.post("/users", createUsers);
app.put("/users/:id", updateUsers);
app.delete("/user/:id", deleteUsers);

app.post("/users/:id/posts", createPosts);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostsById);


app.put("/posts/:id", updatePosts);
app.delete("/posts/:id", deletePosts);
