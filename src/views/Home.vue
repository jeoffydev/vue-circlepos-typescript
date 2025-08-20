<template>
  <section class="hero" id="home">
    <div class="home-banner h-screen w-full relative flex items-center justify-start bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url('https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">
      <div class="banner-content">
        <h1 class="banner-title stylish-title">{{ STORE_TEXT.READ_LEARN }}</h1>
        <p class="mt-3"><button @click="navigateToPage">{{ BUTTON_TEXT.SHOP_NOW }}</button></p>
      </div>
    </div>
    <ContentWrapper :title="PAGE_TEXT.FEATURED_BOOKS" marginTop="0" classPage="homePage">
      <div v-if="isLoading">
        <p class="text-center">{{ STORE_TEXT.LOADING }}</p>
      </div>
      <div v-else>
        <AppBookGrid :books="featuredBooks" />
      </div>
      <div v-if="error">
        <p class="text-center">{{  STORE_TEXT.NO_BOOKS_AVAILABLE  }}</p>
      </div>
      <div class="text-center my-8"><button @click="navigateToPage" > {{  BUTTON_TEXT.SEE_ALL_BOOKS  }} </button></div>
    </ContentWrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBooksStore } from '../stores/books';
import AppBookGrid from '../components/ui/AppBookGrid.vue';
import { STORE_TEXT, BUTTON_TEXT, PAGE_TEXT } from '../constants/text'

export default defineComponent({
  name: 'Home',
  components: {
    ContentWrapper,
    AppBookGrid
  },
  setup() {
    const router = useRouter();
    const booksStore = useBooksStore();
    const { books, error, isLoading } = storeToRefs(booksStore);

    const featuredBooks = computed(() => {
      return books.value.slice(0, 6);
    });
    const navigateToPage = () => {
      router.push('/shops');
    };
    onMounted(async () => {
      if (books.value.length === 0 && !isLoading.value) {
        try {
          await booksStore.fetchBooks();
        } catch (err) {
          booksStore.error = `Failed to fetch books in Home component: ${err}`;
        }
      } 
    });

    return {
      books,
      error,
      isLoading,
      featuredBooks,
      navigateToPage,
      STORE_TEXT,
      BUTTON_TEXT,
      PAGE_TEXT
    };
  }
});
</script>
