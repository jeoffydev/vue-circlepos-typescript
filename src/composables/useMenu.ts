import { ref } from "vue"

export const useMenu = () => {
  const isMenuOpen = ref(false)

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const openMenu = () => {
    isMenuOpen.value = true
  }

  const setupClickOutside = (element: HTMLElement) => {
    const handleClick = (e: Event) => {
      if (element && !element.contains(e.target as Node)) {
        closeMenu()
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }

  return {
    isMenuOpen,
    closeMenu,
    toggleMenu,
    openMenu,
    setupClickOutside
  }
}