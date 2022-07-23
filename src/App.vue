<template>
  <div>
    <p v-for="book in result.allBooks" :key="book.id">
    {{ book.title }}
    </p>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
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
/*
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
      const { result } = useQuery(ALL_BOOKS_QUERY)
      // console.log(result);
      // return results to make it available to the template
      return { result }
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
