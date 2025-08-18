<template>
  <section class="hero" id="home">
    <div class="home-banner">
      <div class="banner-content">
        <h1 class="banner-title stylish-title">Read and Learn!</h1>
        <p><button @click="navigateToPage">Shop Now!</button></p>
      </div>
    </div>
    <ContentWrapper title="Featured Books" marginTop="0" classPage="homePage">
      <div v-if="isLoading">
        <p>Loading books...</p>
      </div>
      <div v-else>
        <AppBookGrid :books="books" />
      </div>
    </ContentWrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBooksStore } from '../stores/books';
import type { IBook } from '../types/book.types';
import AppBookGrid from '../components/ui/AppBookGrid.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ContentWrapper,
    AppBookGrid
  },
  setup() {
    // Router setup
    const router = useRouter();
    const booksStore = useBooksStore();
    const { books, selectedBook, loading, error, totalBooks, isLoading } = storeToRefs(booksStore);

    const featuredBooks = computed(() => {
      return books.value.slice(0, 6);
    });

    // Methods
    const navigateToPage = () => {
      router.push('/shops');
    };

    const selectBook = (book: IBook) => {
      booksStore.setSelectedBook(book);
    };

    // Lifecycle hooks
    onMounted(async () => {
      if (books.value.length === 0 && !isLoading.value) {
        try {
          await booksStore.fetchBooks();
        } catch (err) {
            console.error('Failed to fetch books in Home component:', err);
        }
      } else {
          console.log('Books already loaded or loading:', books.value.length);
      }
    });

    return {
      books,
      selectedBook,
      loading,
      error,
      totalBooks,
      isLoading,
      featuredBooks,
      navigateToPage,
      selectBook,
    };
  }
});
</script>

<style scoped>
main {
  width: 100%;
}
.home-banner {
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  background-image: url("https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.banner-content h1 {
  background-color: #646cff;
  color: white;
}
.home-banner button {
  background-color: #323232;
}
.banner-content {
  padding-left: 2rem;
}
</style>
