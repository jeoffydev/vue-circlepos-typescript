<template>
    <div class="page">
        <div class="title-wrapper">
            <h1>{{ title }}</h1>
        </div>
        <main class="wrapper-content">
            <slot></slot>
        </main>
         <Footer />
    </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'
import Footer from '../Footer.vue'

export default defineComponent({
    name: 'ContentWrapper',
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
        }
    },
    setup(props) {
         console.log('Title prop:', props);
        return {
            title: props.title,
            marginTop: props.marginTop
        }
    },
    components: {
        Footer  
    },
})
</script>

<style scoped>
    .title-wrapper {
    display: flex;
    padding:0.5rem;
    margin-top:  v-bind(marginTop);
    }
    .wrapper-content {
        padding:0.5rem;
    }
    .page {
        padding: 0.5rem;
    }
</style>