# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

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