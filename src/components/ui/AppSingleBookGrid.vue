<template>
  <div class="books-grid">
    <div class="book-card">
      <h3 class="book-title">{{ book?.title }}</h3>
      <div class="book-info">
        <p class="book-author">{{ book?.author }}</p>
        <p class="book-price">${{ book?.price }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType  } from 'vue';
import type { IBook } from '../../types/book.types';

export default defineComponent({
    name: 'AppSingleBookGrid',
    props: {
        book: {
            type: Object as PropType<IBook | null>,
            required: false,
            default: null
        },
    },
    setup(props) {
        return {
            book: props.book,
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
