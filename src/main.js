import { createApp, h, provide } from 'vue'
import { 
    ApolloClient, 
    createHttpLink, 
    InMemoryCache,
    split
} from '@apollo/client/core'
import gql from 'graphql-tag'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { WebSocketLink } from '@apollo/client/link/ws'
import App from './App.vue'
import { getMainDefinition } from '@apollo/client/utilities'
import typeDefs from './graphql/typedefs.gql'
import FAVORITE_BOOKS_QUERY from './graphql/favoriteBooks.query.gql'

const wsLink = new WebSocketLink({
  // The URL is usually defined at the server side
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

// Callback function that receive a query
const link = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const cache = new InMemoryCache()

// Add some favorite books to the cache
cache.writeQuery({
    query: FAVORITE_BOOKS_QUERY,
    data: {
        // Initial data for favorite books
        favoriteBooks: [{
            __typename: 'Book',
            title: 'New favorite book',
            id: 123,
            rating: 5
        }]
    }
})

const apolloClient = new ApolloClient({
    //link: httpLink, // this will only handle http request
    link, // This link can handle both http request and websocket subscription
    cache,
    typeDefs
})

/*
const ALL_BOOKS_QUERY = gql`
    query allBooks {
        allBooks {
            id
            title
            rating
        }
    }
`

apolloClient
    .query({
        query: ALL_BOOKS_QUERY
    })
    .then( res => {
        console.log(res)
    })
*/

// Need some refactoring...
//createApp(App).mount('#app')

// With that we can make calls using Apollo Client form vue's components
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.mount('#app')
