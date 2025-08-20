<template>
  <div v-if="purchasedBook?.book.id">
    <app-purchased-book
      :book="purchasedBook.book"
      :message="purchasedBook.message"
    />
  </div>
  <div v-else-if="error">
      <p class="text-center">{{  STORE_TEXT.NO_BOOKS_AVAILABLE  }}</p>
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
  DETAILS_TEXT,
  STORE_TEXT
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
      error
    } = storeToRefs(booksStore);

    const getImageUrl = (id: number) => {
      const imgLength = bookUrl.length;
      const imgId = id >= imgLength ? 0 : id;
      return bookUrl[imgId];
    };

    const purchaseBook = async () => {
      booksStore.clearPurchasedBook();
      if (props.book?.id) {
        try {
          await booksStore.purchaseBookById(props.book?.id);
        } catch (err) {
          booksStore.error = `Failed to purchase this book - ${err}`;
        }
      }
    };

    return {
      book: props.book,
      bookUrl: getImageUrl(props.book?.id as number),
      BUTTON_TEXT,
      DETAILS_TEXT,
      STORE_TEXT,
      purchaseBook,
      purchasedBook,
      error
    }
  },
})
</script>
