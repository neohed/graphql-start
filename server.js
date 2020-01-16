const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const RandomDie = require('./RandomDie');
const Message = require('./Message');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    input MessageInput {
        content: String
        author: String
    }
    
    type Message {
        id: ID!
        content: String
        author: String
    }

    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }
    
    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }

    type Query {
        hello: String
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        rollDice(numDice: Int!, numSides: Int): [Int]
        getDie(numSides: Int): RandomDie
        getMessage(id: ID!): Message
    }
`);

const fakeDatabase = {};

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
    rollDice: ({numDice, numSides}) => {
        const output = [];
        for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    },
    getDie: ({numSides}) => {
        return new RandomDie(numSides || 6);
    },
    createMessage: ({input}) => {
        // Create a random id for our "database".
        const id = require('crypto').randomBytes(10).toString('hex');

        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: ({id, input}) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    getMessage: ({id}) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
