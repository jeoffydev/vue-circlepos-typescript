<template>
  <ContentWrapper title="Book Details" classPage="bookDetailPage">
     <div v-if="isLoading">
        <p>Loading book...</p>
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

export default defineComponent({
    name: 'BookDetail',
    components: {
        ContentWrapper,
        AppSingleBookGrid
    },
    setup(){
        const route = useRoute();
        //get ID in route route.params.id
        const booksStore = useBooksStore();
        const { selectedBook, isLoading } = storeToRefs(booksStore);
      
       onMounted(async () => {
          if (route.params.id) {
            try {
              await booksStore.fetchBookById(parseInt(route.params.id as string));
            } catch (err) {
                console.error('Failed to fetch this book', err);
            }
          } else {
              console.log('Books already loaded or loading:', selectedBook.value);
          }
        });

        return {
          selectedBook,
          isLoading,
        };
    }
});
</script>
