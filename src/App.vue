<script setup>
import MainPage from './components/MainPage.vue'
import HeaderMenu from './components/Header.vue'
</script>

<template>
    <div class="main-app">
      <HeaderMenu /> 
      <router-view />
    </div>
</template>
 