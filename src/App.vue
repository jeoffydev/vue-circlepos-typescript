<template>
  <div id="main-app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
    AppHeader
  },
})
</script>
