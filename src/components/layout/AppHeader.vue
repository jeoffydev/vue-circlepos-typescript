<template>
  <header class="fixed top-0 w-full z-50 bg-white shadow-lg">
    <nav class="bg-white h-[70px] px-5">
      <div class="flex justify-start items-stretch h-full max-w-6xl mx-auto" ref="navContainerRef">
        <div class="nav-logo">
          <a href="/" class="no-underline">
            <img alt="Jeoffys logo" class="logo" :src="logoUrl" />
          </a>
        </div>
        <div class="logo-text"><span>{{ PAGE_TEXT.SITE_NAME }}</span></div>
        <div class="flex items-center">
          <ul class="nav-menu" :class="{ active: isMenuOpen }">
            <li v-for="item in menuItems" :key="item.id">
              <router-link :to="item.to">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>
        <div class="md:hidden flex flex-col cursor-pointer p-1 relative top-4" @click="toggleMenu">
          <span class="bar" :class="{ active: isMenuOpen }"></span>
          <span class="bar" :class="{ active: isMenuOpen }"></span>
          <span class="bar" :class="{ active: isMenuOpen }"></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import logoUrl from '../../assets/logo.png'
import { menuItems } from '../../config/header-menu'
import { useMenu } from '../../composables/useMenu'
import { PAGE_TEXT } from '../../constants/text'

const navContainerRef = ref<HTMLElement | null>(null)

const { isMenuOpen, closeMenu, toggleMenu, setupClickOutside } = useMenu()

onMounted(() => {
  if (navContainerRef.value) {
    setupClickOutside(navContainerRef.value)
  }
})

defineExpose({
  isMenuOpen,
  closeMenu,
  toggleMenu,
  PAGE_TEXT
})
</script>
