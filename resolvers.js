const RandomDie = require('./RandomDie');
const Message = require('./Message');

const fakeDatabase = {};

module.exports = {
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
