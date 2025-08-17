<template>
  <footer class="footer">
    <section class="footer-description">
       <p>© 2025 Jeoffys Bookshop. All rights reserved.</p>
    </section>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Footer',
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
