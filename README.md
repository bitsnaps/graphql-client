# Vue 3 + Vite + GraphQL & Apollo Client

This project was created with Vue 3 in Vite. It demonstrates the usage of GraphQL using Apollo Client with Vue3.
## Setup
This instructions can be used to create this app:
```
npm init vite@latest graphql-client -- --template vue
cd graphql-client
npm install
npm run dev
```

## Dependencies
```
# GraphQL main package
npm install graphql

# Parse string
npm install graphql-tag

# Interact with GraphQL server
npm install @apollo/client

# Integration to use composition API
npm install @vue/apollo-composable

# Used to store GraphQL queries into *.gql files
npm install @rollup/plugin-graphql

```
for GraphQL Subscriptions:
```
npm install subscriptions-transport-ws
```
or better use: [graphql-ws](https://www.npmjs.com/package/graphql-ws) instead.