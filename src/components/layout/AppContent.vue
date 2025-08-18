<template>
  <section :id="`page-content-${classPage}`">
    <div class="title-wrapper">
      <h1 class="page-title">{{ title }}</h1>
    </div>
    <div class="wrapper-content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';

export default defineComponent({
    name: 'AppContent',
    props: {
        title: {
            type: String,
            required: false,
            default: 'Default Title'
        },
        marginTop: {
            type: String,
            required: false,
            default: '2rem'
        },
        classPage: {
            type: String,
            required: true,
            default: 'insidePage'
        }
    },
    setup(props) {
        return {
            title: props.title,
            marginTop: props.marginTop,
            classPage: props.classPage
        }
    },
})
</script>

<style scoped>
.title-wrapper {
  display: flex;
  padding: 0.5rem;
  margin-top: v-bind(marginTop);
}
.page-title {
  margin-bottom: 1rem;
}
.wrapper-content {
  padding: 0.5rem;
}
.page {
  padding: 0.5rem;
}
</style>
