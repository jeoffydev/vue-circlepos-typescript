<template>
  <ContentWrapper :title="PAGE_TEXT.BOOK_DETAILS" classPage="bookDetailPage">
     <div v-if="isLoading">
        <p class="text-center">{{  STORE_TEXT.LOADING  }}</p>
      </div>
      <div v-else> 
        <AppSingleBookGrid :book="selectedBook" />
      </div>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';
import { useRoute } from 'vue-router';
import { useBooksStore } from '../stores/books';
import { storeToRefs } from 'pinia';
import AppSingleBookGrid from '../components/ui/AppSingleBookGrid.vue';
import { STORE_TEXT, BUTTON_TEXT, PAGE_TEXT } from '../constants/text'

export default defineComponent({
  name: 'BookDetail',
  components: {
    ContentWrapper,
    AppSingleBookGrid
  },
  setup() {
    const route = useRoute();
    //get ID in route route.params.id
    const booksStore = useBooksStore();
    const {
      selectedBook,
      isLoading
    } = storeToRefs(booksStore);

    onMounted(async () => {
      //cleanup the selectedBooks
      booksStore.clearSelectedBook();
      //Clear the purchased book
      booksStore.clearPurchasedBook();
      if (route.params.id) {
        try {
          await booksStore.fetchBookById(parseInt(route.params.id as string));
        } catch (err) {
          console.error('Failed to fetch this book', err);
        }
      }
    });

    return {
      selectedBook,
      isLoading,
      STORE_TEXT,
      BUTTON_TEXT,
      PAGE_TEXT
    };
  }
});
</script>
