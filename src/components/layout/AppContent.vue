<template>
  <section :id="`page-content-${classPage}`" class="min-h-screen">
    <div class="flex p-2" :style="{ marginTop: marginTop }">
      <h1 class="mb-4 ml-3">{{ title }}</h1>
    </div>
    <div class="p-2">
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
      default: '4.5rem'
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
