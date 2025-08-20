<template>
  <section class="flex flex-wrap gap-6 p-4 justify-start items-stretch text-gray-700">
    <article v-for="book in books" :key="book.id" class="p-5 flex-1 min-w-[300px] border border-gray-300 rounded-sm bg-gray-100 hover:bg-indigo-500 hover:text-white">
      <h3 class="mt-0 mb-4 page-title">{{ book.title }}</h3>
      <div>
        <p>{{ DETAILS_TEXT.AUTHOR }}: {{ book.author }}</p>
        <p><span class="font-bold">${{ book.price }}</span></p>
        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" @click="navigateToPage(book.id)" :id="`book-btn-view-${book.id}`">
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
