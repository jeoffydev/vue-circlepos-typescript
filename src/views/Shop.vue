<template>
  <ContentWrapper title="Shop Books" classPage="shopPage">
    <p>Books here</p>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';

export default defineComponent({
    name: 'Shop',
    components: {
        ContentWrapper
    }
});
</script>

<style scoped></style>
