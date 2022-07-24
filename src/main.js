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
import { getMainDefinition } from "@apollo/client/utilities"

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

const apolloClient = new ApolloClient({
    //link: httpLink, // this will only handle http request
    link, // This link can handle both http request and websocket subscription
    cache
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
