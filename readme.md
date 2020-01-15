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

