<template>
  <div class="books-grid">
    <div v-for="book in books" :key="book.id" class="book-card">
      <h3 class="book-title">{{ book.title }}</h3>
      <div class="book-info">
        <p class="book-author">{{ book.author }}</p>
        <p class="book-price">${{ book.price }}</p>
        <button class="add-to-cart-btn" @click="navigateToPage(book.id)">
            View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType  } from 'vue';
import type { IBook } from '../../types/book.types';
import router from '../../router';

export default defineComponent({
    name: 'AppBookGrid',
    props: {
        books: {
            type: Array as PropType<IBook[]>,
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
            navigateToPage
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
</style>
