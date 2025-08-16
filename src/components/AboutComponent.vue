<template>
    <ContentWrapper title="About Us" marginTop="150px">
            <p>TESTING</p>
    </ContentWrapper>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import ContentWrapper from './templates/ContentWrapper.vue';

    export default defineComponent({
        name: 'AboutComponent',
        components: {
            ContentWrapper
        }
    });
</script>