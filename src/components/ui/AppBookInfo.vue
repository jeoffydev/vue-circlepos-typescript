<template>
  <section class="block p-4 text-gray-700">
    <article class="flex flex-wrap justify-start items-stretch gap-1 p-5 border border-gray-400 rounded-sm bg-gray-100">
      <figure class="flex-1 min-w-[300px]">
        <img alt="Book" class="w-full max-w-[550px] h-auto" :src="bookUrl" />
      </figure>
      <div class="flex-1 min-w-[300px]">
        <h3 class="book-title mb-4">
          {{ book?.title

          }}<span class="block font-sans italic text-lg">{{ DETAILS_TEXT.AUTHOR }}: {{ book?.author }}</span>
        </h3>
        <div>
          <ul class="block m-0 p-0">
            <li class="list-none">
              {{ DETAILS_TEXT.ISBN }}: {{ book?.isbn }}
            </li>
            <li class="list-none mb-4">
              {{ DETAILS_TEXT.AVAILABILITY }}: {{ book?.availableStock }}
            </li>
            <li class="list-none">
              <span class="inline-block p-1 text-3xl bg-orange-200">${{ book?.price }}</span>
            </li>
          </ul>
          <p class="mt-4">
            <button
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
