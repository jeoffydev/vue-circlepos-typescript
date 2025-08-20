<template>
  <footer class="text-center bg-gradient-to-br from-slate-700 to-slate-600 text-gray-100 mt-auto p-2">
    <section class="leading-relaxed mb-6 text-gray-300">
       <p>{{ PAGE_TEXT.FOOTER_TEXT }}</p>
    </section>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  PAGE_TEXT
} from '../../constants/text'

export default defineComponent({
  name: 'Footer',
  data() {
    return {
      PAGE_TEXT
    }
  },
});
</script>

