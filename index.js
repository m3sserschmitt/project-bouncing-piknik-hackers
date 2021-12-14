const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/express');
const authorizationMiddleware = require('./middleware/authorization');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql');


const app = express();


// app.get("/users", getAllUsers);
// app.get("/users/:id", getUsersById);
// app.post("/users", createUsers);
// app.put("/users/:id", updateUsers);
// app.delete("/user/:id", deleteUsers);

// app.post("/users/:id/posts", createPosts);

// app.get("/posts", getAllPosts);
// app.get("/posts/:id", getPostsById);


// app.put("/posts/:id", updatePosts);
// app.delete("/posts/:id", deletePosts);

app.use('/graphql', authorizationMiddleware, graphqlHTTP({
    schema,
}));

app.listen(port, () => {
    console.log("A pornit serveru' la ", port);
});