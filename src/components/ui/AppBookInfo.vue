<template>
  <section class="books-grid">
    <article class="book-card">
      <figure class="book-section">
        <img alt="Book" class="book-img" :src="bookUrl" />
      </figure>
      <div class="book-section">
        <h3 class="book-title">
          {{ book?.title

          }}<small>{{ DETAILS_TEXT.AUTHOR }}: {{ book?.author }}</small>
        </h3>
        <div class="book-info">
          <ul>
            <li class="book-author">
              {{ DETAILS_TEXT.ISBN }}: {{ book?.isbn }}
            </li>
            <li class="book-availability">
              {{ DETAILS_TEXT.AVAILABILITY }}: {{ book?.availableStock }}
            </li>
            <li class="book-price">
              <span class="price">${{ book?.price }}</span>
            </li>
          </ul>
          <p>
            <button
              class="buyBtn"
              @click="handlePurchase"
              :disabled="!book?.id"
            >
              {{ BUTTON_TEXT.BUY_NOW }}:
            </button>
          </p>
        </div>
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
import {
  BUTTON_TEXT,
  DETAILS_TEXT
} from '../../constants/text'

export default defineComponent({
  name: 'AppBookInfo',
  props: {
    book: {
      type: Object as PropType < IBook | null >,
      required: false,
      default: null
    },
    bookUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['purchase'],
  setup(props, { emit }) {
    const handlePurchase = () => {
      if (props.book?.id) {
        emit('purchase', props.book.id);
      }
    };
    return {
      book: props.book,
      bookUrl: props.bookUrl,
      BUTTON_TEXT,
      DETAILS_TEXT,
      handlePurchase
    }
  }
})
</script>

<style scoped>
.books-grid {
  display: block;
  padding: 1rem;
}
.book-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0.2rem;
  padding: 1.3rem;
  border: 1px solid #bebebe;
  border-radius: 0.2rem;
  background-color: #f6f6f6;
}
.book-title small {
  display: block;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-style: italic;
  font-size: 0.8rem;
}
.book-section {
  flex: 1 1 300px;
}
.book-img {
  width: 100%;
  max-width: 550px;
  height: auto;
}
.price {
  display: inline-block;
  padding: 0.3rem;
  font-size: 2rem;
  background-color: #ffdca5;
}
.book-info ul {
  display: block;
  margin: 0;
  padding: 0;
}
.book-info ul li {
  list-style-type: none;
}
.book-availability {
  margin-bottom: 1rem;
}
</style>
