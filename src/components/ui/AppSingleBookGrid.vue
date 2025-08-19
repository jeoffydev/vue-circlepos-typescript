<template>
  <div v-if="purchasedBook?.book.id">
    <app-purchased-book
      :book="purchasedBook.book"
      :message="purchasedBook.message"
    />
  </div>
  <div v-else>
    <app-book-info :book="book" @purchase="purchaseBook" :book-url="bookUrl" />
  </div>
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
  bookUrl
} from '../../constants/book-images';
import {
  BUTTON_TEXT,
  DETAILS_TEXT
} from '../../constants/text'
import { useBooksStore } from '../../stores/books';
import { storeToRefs } from 'pinia';
import AppBookInfo from './AppBookInfo.vue';
import AppPurchasedBook from './AppPurchasedBook.vue';

export default defineComponent({
  name: 'AppSingleBookGrid',
  props: {
    book: {
      type: Object as PropType < IBook | null > ,
      required: false,
      default: null
    },
  },
  components: {
    AppBookInfo,
    AppPurchasedBook
  },
  setup(props) {

    const booksStore = useBooksStore();
    const {
      purchasedBook,
    } = storeToRefs(booksStore);

    let imgId = undefined;
    const getImageUrl = (id: number) => {
      const imgLength = bookUrl.length;
      const imgId = id >= imgLength ? 0 : id;
      return bookUrl[imgId];
    };
    imgId = getImageUrl(props.book?.id as number);

    const purchaseBook = async () => {
      // Cleanup the purchasedBook
      booksStore.clearPurchasedBook();
      if (props.book?.id) {
        try {
          await booksStore.purchaseBookById(props.book?.id);
        } catch (err) {
          console.error('Failed to purchase this book', err);
        }
      }
    };

    return {
      book: props.book,
      bookUrl: imgId,
      BUTTON_TEXT,
      DETAILS_TEXT,
      purchaseBook,
      purchasedBook
    }
  },
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
