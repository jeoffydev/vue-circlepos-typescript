<template>
  <section class="books-grid">
    <article class="book-card">
      <div class="book-section">
        <h3 class="msg">
          <span><i class="fas fa-check"></i></span> {{ message }}
        </h3>
        <div class="book-info">
          <h3 class="book-title">
            {{ book?.title

            }}<small>{{ DETAILS_TEXT.AUTHOR }}: {{ book?.author }}</small>
          </h3>
          <ul>
            <li class="book-author">
              {{ DETAILS_TEXT.ISBN }}: {{ book?.isbn }}
            </li>
          </ul>
          <p>
            <button class="buyBtn" @click="navigateToPage">
              {{ BUTTON_TEXT.CONTINUE_SHOPPING }}
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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppPurchasedBook',
  props: {
    book: {
      type: Object as PropType < IBook | null >,
      required: false,
      default: null
    },
    message: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter();
    const navigateToPage = () => {
      router.push('/shops');
    };
    return {
      book: props.book,
      bookUrl: props.message,
      BUTTON_TEXT,
      DETAILS_TEXT,
      navigateToPage
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
  justify-content: center;
  align-items: stretch;
  gap: 0.2rem;
  padding: 1.3rem;
  border: 1px solid #bebebe;
  border-radius: 0.2rem;
  background-color: #f6f6f6;
  text-align: center;
}
.msg span {
  display: inline-block;
  padding: 0.6rem;
  border-radius: 50%;
  background-color: green;
  position: relative;
  top: 0.2rem;
  margin-right: 1rem;
}
.msg i {
  font-size: 1.7rem;
  color: white;
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
