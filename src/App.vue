<template>
  <div v-if="result">
  <h3>GraphQL with Apollo & Vue</h3>

    <input type="text" v-model="searchTerm">
    <p v-for="book in result.allBooks" :key="book.id">
    {{ book.title }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuery } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'

/*/ No longer needed, since we're importing queries from *.gql file
import gql from 'graphql-tag'
const ALL_BOOKS_QUERY = gql`
    query allBooks {
        allBooks {
            id
            title
            rating
        }
    }
`
*/


/*/ No longer needed, since we've injected it into vue app
apolloClient
    .query({
        query: ALL_BOOKS_QUERY
    })
    .then( res => {
        console.log(res)
    })
*/
export default {
    name: 'App',
    // This will be executed before the creation of the component
    setup() {
      const searchTerm = ref('')
      const { result } = useQuery(ALL_BOOKS_QUERY, () => ({ 
        search: searchTerm.value 
        })
        )
      // console.log(result)
      // return results to make it available to the template
      return { result, searchTerm }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 960px;
}

.list {
  width: 50%;
}
</style>
