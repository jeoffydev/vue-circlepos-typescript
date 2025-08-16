
<template>
  <header class="header">
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="#" class="nav-logo-link">
                   <img alt="Jeoffys logo" class="logo" :src="logoUrl" />  
                </a>
            </div>
            <div class="logo-text"><span>Jeoffy's Books</span></div>
            <div class="desktop-menu">
              <ul class="nav-menu">
                <li class="nav-item">
                  <a href="#home" class="nav-link">Home</a>
                </li> 
              </ul>
            </div>
        </div>
    </nav>
  </header>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
import logoUrl from '../assets/logo.png'

export default defineComponent({
  name: 'HeaderMenu',
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      logoUrl
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
      this.isDropdownOpen = false;
    },
    showDropdown() {
      this.isDropdownOpen = true;
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    },
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeMenu();
      }
    });
  }
});
</script>

<style scoped> 


.logo-text {
  display: flex;
  align-items: center;
  padding-right:2rem;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  background: #fff;
  height: 70px;
  padding: 0 20px;
}

.nav-container {
  display: flex;
  justify-content: flex-start; 
  align-items: stretch; 
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo-link {
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item {
  position: relative;
  margin-left: 30px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

.dropdown-arrow {
  margin-left: 5px;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px 0;
  margin-top: 10px;
  min-width: 180px;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.dropdown-link:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.logo {
  width: 80px;
  height: auto;
}

@media screen and (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: #fff;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 20px 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    margin: 10px 0;
  }

  .nav-link {
    justify-content: center;
    padding: 15px 0;
    font-size: 18px;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }

  .nav-toggle.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .nav-toggle.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: #f8f9fa;
    margin: 10px 20px;
    border-radius: 6px;
  }

  .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}

/* Animation for mobile menu bars */
.bar.active:nth-child(2) {
  opacity: 0;
}

.bar.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.bar.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>