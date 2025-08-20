<template>
  <section class="block p-4 text-gray-700">
    <article class="flex flex-wrap justify-center items-stretch gap-1 p-5 border border-gray-400 rounded-sm bg-gray-100 text-center">
      <div class="flex-1 min-w-[300px]">
        <h3 class="mb-8">
          <span class="inline-block p-2 rounded-full bg-green-500 relative top-1 mr-4"><i class="fas fa-check text-3xl text-white"></i></span> {{ message }}
        </h3>
        <div>
          <h3 class="book-title">
            {{ book?.title

            }}<small class="block font-sans italic text-sm">{{ DETAILS_TEXT.AUTHOR }}: {{ book?.author }}</small>
          </h3>
          <ul class="block m-0 p-0">
            <li class="list-none">
              {{ DETAILS_TEXT.ISBN }}: {{ book?.isbn }}
            </li>
          </ul>
          <p>
            <button class="m-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" @click="navigateToPage">
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
