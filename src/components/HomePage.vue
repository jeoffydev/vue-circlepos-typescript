<template>
    <main>
         <div class="home-banner">
            <div class="banner-content">
                <h1 class="banner-title stylish-title">Read and Learn!</h1>
            </div>
        </div>
        <ContentWrapper title="Featured Books" marginTop="0" >
            <p>This is the homepage</p>
        </ContentWrapper>
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import ContentWrapper from './templates/ContentWrapper.vue';

    export default defineComponent({
        name: 'HomePage',
        components: {
            ContentWrapper
        }
    });
</script>

<style scoped> 
    main {
        width:100%;
    }
    .home-banner {
        height: 100vh;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: left;
        background-image: url('https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed; 
    }
    .banner-content h1 {
        background-color:#646cff;
        color: white;
        margin-left: 2rem;
    }
</style>