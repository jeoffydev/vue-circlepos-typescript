<template>
  <ContentWrapper title="About Us" classPage="aboutPage">
    <p>TESTING</p>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentWrapper from '../components/layout/AppContent.vue';

export default defineComponent({
    name: 'About',
    components: {
        ContentWrapper
    }
});
</script>
