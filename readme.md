# graphql-start

### Tutorial
* [graphql.org/graphql-js](https://graphql.org/graphql-js/)

### Call API from shell
```shell script
curl -X POST -H "Content-Type: application/json" -d '{"query": "{ hello }"}' http://localhost:4000/graphql
```

### Pasting this into a dev console as per instructions does not work.
```javascript
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

### Example Query

```graphql
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```

```javascript
var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

### JS to call rollDice with params

```javascript
var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

### example query

```graphql
{
  quoteOfTheDay,
  random,
  rollThreeDice,
  rollDice(numDice: 7, numSides: 6)
}
```

### mutation query

```graphql
mutation {
  setMessage(message: "Farewell and adieu...")
}
```

### mutation with input type query

```graphql
mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}
```

### The request - using the ID returned by createMessage

```graphql
query {
  getMessage(id: "b180053fee6a5cd1ff4c") {
    id
    content
    author
  }
}
```

### Calling that with JS

```javascript
var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      }
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

## ToDo
* Understand "context".  It can be an object or function.
