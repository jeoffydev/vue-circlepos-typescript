<template>
        <ContentWrapper title="Shop Books">
            <p>Books here</p>
        </ContentWrapper>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import ContentWrapper from './templates/ContentWrapper.vue';

    export default defineComponent({
        name: 'ShopsComponent',
        components: {
            ContentWrapper
        }
    });
</script>

<style scoped> 
   
</style>