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
  getMessage(id: "f933bb95b94e1b524ecd") {
    id
    content
    author
  }
}
```

### Calling that with JS

```javascript
const author = 'andy';
const content = 'hope is a good thing';
const query = `mutation CreateMessage($input: MessageInput) {
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

### Constructing Types - GraphQLSchema 

> When we use this method of creating the API, the root level resolvers are implemented on the Query and Mutation types rather than on a root object.

* [constructing-types](https://graphql.org/graphql-js/constructing-types/)
* [schema-stitching](https://www.advancedgraphql.com/content/schema-stitching)

## Advanced GraphQL

[advancedgraphql.com](https://www.advancedgraphql.com/content/schema-transformation)

## Best Practics
[best-practices](https://graphql.org/learn/best-practices/)

* Pagination
> Typically fields that could return long lists accept arguments "first" and "after" to allow for specifying a specific region of a list, where "after" is a unique identifier of each of the values in the list.

# Appendix

## Scalar Types

* Int
* Float
* String
* Boolean
* ID

## ToDo
* Understand "context".  It can be an object or function.
