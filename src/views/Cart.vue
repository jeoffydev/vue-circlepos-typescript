<template>
  <ContentWrapper title="My Cart" classPage="cartPage">
    <p>Books here</p>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';

export default defineComponent({
    name: 'Cart',
    components: {
        ContentWrapper
    }
});
</script>

<style scoped></style>
