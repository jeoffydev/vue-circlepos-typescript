<template>
  <footer class="footer">
    <section class="footer-description">
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
<style scoped>
.footer {
  text-align: center;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  margin-top: auto;
  padding: 0.5rem;
}
.footer-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #bdc3c7;
}
</style>
