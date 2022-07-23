import { createApp, h, provide } from 'vue'
import { 
    ApolloClient, 
    createHttpLink, 
    InMemoryCache 
} from '@apollo/client/core'
import App from './App.vue'
import gql from 'graphql-tag'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
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
