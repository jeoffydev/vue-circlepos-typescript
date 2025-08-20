<template>
  <section class="books-grid">
    <article v-for="book in books" :key="book.id" class="book-card">
      <h3 class="book-title">{{ book.title }}</h3>
      <div class="book-info">
        <p class="book-author">{{ DETAILS_TEXT.AUTHOR }}: {{ book.author }}</p>
        <p class="book-price">${{ book.price }}</p>
        <button class="add-to-cart-btn" @click="navigateToPage(book.id)" :id="`book-btn-view-${book.id}`">
          {{ BUTTON_TEXT.VIEW_DETAILS  }}
        </button>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  type PropType
} from 'vue';
import type {
  IBook
} from '../../types/book.types';
import router from '../../router';
import {
  BUTTON_TEXT,
  DETAILS_TEXT
} from '../../constants/text'

export default defineComponent({
  name: 'AppBookGrid',
  props: {
    books: {
      type: Array as PropType < IBook[] > ,
      required: false,
      default: []
    },
  },
  setup(props) {

    const navigateToPage = (id: number) => {
      router.push(`/book/${id}`);
    };

    return {
      books: props.books,
      navigateToPage,
      BUTTON_TEXT,
      DETAILS_TEXT,
    }
  },
})
</script>

<style scoped>
.books-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  justify-content: flex-start;
  align-items: stretch;
}
.book-card {
  padding: 1.3rem;
  flex: 1 1 300px;
  border: 1px solid #e5e5e5;
  border-radius: 0.2rem;
  background-color: #f6f6f6;
}
.book-card:hover {
  background-color: #535bf2;
  color: white;
}
.book-title {
    margin-top: 0;
    margin-bottom: 1rem;
}
</style>
