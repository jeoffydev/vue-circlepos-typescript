<template>
  <ContentWrapper title="About Us" classPage="aboutPage">
    <article class="p-4 border border-gray-300">
      <p>
        We believe local bookstores are essential community hubs that foster
        culture, curiosity, and a love of reading, and we're committed to
        helping them thrive.
      </p>
      <p>
        Every purchase on the site financially supports independent bookstores.
        Our platform gives independent bookstores tools to compete online and
        financial support to help them maintain their presence in local
        communities.
      </p>
    </article>
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
