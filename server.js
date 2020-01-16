const express = require('express');
const graphqlHTTP = require('express-graphql');
const { readFileSync } = require('fs');
const { buildSchema } = require('graphql');
const loggingMiddleware = require('./loggingMiddleware');

// Construct a schema, using GraphQL schema language
const schemaDefs = readFileSync('./schema.graphql', 'UTF-8');
const schema = buildSchema(schemaDefs);

// The root provides a resolver function for each API endpoint
const root = require('./resolvers');

const app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
