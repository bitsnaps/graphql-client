<template>
  <div>
  <h3>GraphQL with Apollo & Vue</h3>
    
    <div>
      <button v-if="!showNewBookForm" @click="showNewBookForm = true">
        Add a new book
      </button>
      <AddBook v-if="showNewBookForm" :search="searchTerm" @closeForm="showNewBookForm = false" />
    </div>

    <input type="text" v-model="searchTerm" autofocus>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong! Please try again</p>

    <template v-else>
      <p v-if="activeBook">
        Update "{{ activeBook.title }}" rating:
        <EditRating
          :initial-rating="activeBook.rating"
          :book-id="activeBook.id"
          @closeForm="activeBook = null"
        />
      </p>

      <template v-else>
        <section class="list-wrapper">
          <div class="list">
            <h3>All Books</h3>
            <p v-for="book in books" :key="book.id">
              {{ book.title }} - {{ book.rating}}
              <button @click="activeBook = book">Edit rating</button>
              <button @click="addBookToFavorites({ book })">Add to favorites</button>
            </p>
          </div>

          <div class="list">
            <h3>Favorite Books</h3>
            <p v-for="book in favBooksResult.favoriteBooks" :key="book.id">
              {{ book.title }}
            </p>            
          </div>
        </section>

      </template>

    </template>

  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'
import BOOK_SUBSCRIPTION from './graphql/newBook.subscription.gql'
import FAVORITE_BOOKS_QUERY from './graphql/favoriteBooks.query.gql'
import ADD_BOOK_TO_FAVORITES_MUTATION from './graphql/addBookToFavorites.mutation.gql'
import EditRating from "./components/EditRating.vue"
import AddBook from "./components/AddBook.vue"

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
    components: {
      EditRating,
      AddBook
    },
    // This will be executed before the creation of the component
    setup() {
      const searchTerm = ref('')
      const activeBook = ref(null)
      const showNewBookForm = ref(false)

      const { result, loading, error, subscribeToMore } = useQuery(
        ALL_BOOKS_QUERY, 
        () => ({ 
          search: searchTerm.value 
        }),
        () => ({
          // Send query only when the user stops typing (delay in ms)
          debounce: 500,
          // the query fires only when this condition becomes true
          enabled: searchTerm.value.length > 2
        })
        )
      // console.log(result)

      subscribeToMore(() => ({
        document: BOOK_SUBSCRIPTION,
        updateQuery(previousResult, newResult) {
          const res = {
            allBooks: [
              ...previousResult.allBooks,
              newResult.subscriptionData.data.bookSub
            ]
          }
          return res
        }
      }))

      // Save results into books constant
      // const defaultValue = [] // default value for allBooks
      // Deprecated way
      // const books = useResult(result, defaultValue, data => data.allBooks)
      // Recommended way
      const books = computed(() => result.value?.allBooks ?? [])

      const { result: favBooksResult } = useQuery(FAVORITE_BOOKS_QUERY)
      // console.log(favBooksResult.value);

      const { mutate: addBookToFavorites } = useMutation(
        ADD_BOOK_TO_FAVORITES_MUTATION
      )

      // return results to make it available to the template
      return { 
        books, 
        searchTerm, 
        loading, 
        error, 
        activeBook, 
        showNewBookForm, 
        favBooksResult ,
        addBookToFavorites
      }
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
