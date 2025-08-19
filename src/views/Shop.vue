<template>
  <ContentWrapper :title="PAGE_TEXT.BOOKSHOP" classPage="shopPage">
    <div class="home-banner"></div>
    <div v-if="isLoading">
      <p class="text-center"> {{ STORE_TEXT.LOADING  }}</p>
    </div>
    <div v-else>
      <AppBookGrid :books="books" />
    </div>
    <div v-if="error">
      <p class="text-center">{{ STORE_TEXT.NO_BOOKS_AVAILABLE  }}</p>
    </div>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from '../stores/books';
import { storeToRefs } from 'pinia';
import AppBookGrid from '../components/ui/AppBookGrid.vue';
import { STORE_TEXT, BUTTON_TEXT, PAGE_TEXT } from '../constants/text'

export default defineComponent({
  name: 'Shop',
  components: {
    ContentWrapper,
    AppBookGrid
  },
  setup() {
    const router = useRouter();
    const booksStore = useBooksStore();
    const {
      books,
      error,
      isLoading
    } = storeToRefs(booksStore);

    // Methods to details
    const navigateToPage = () => {
      router.push('/shops');
    };

    // Lifecycle hooks
    onMounted(async () => {
      if (books.value.length === 0 && !isLoading.value) {
        try {
          await booksStore.fetchBooks();
        } catch (err) {
          console.error('Failed to fetch books in Shop component:', err);
        }
      }
    });

    return {
      books,
      error,
      isLoading,
      navigateToPage,
      STORE_TEXT,
      BUTTON_TEXT,
      PAGE_TEXT
    };
  }
});
</script>

<style scoped>
.home-banner {
  height: 100vh;
  max-height: 200px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  background-image: url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
