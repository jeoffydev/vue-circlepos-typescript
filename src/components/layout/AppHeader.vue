<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <a href="/" class="nav-logo-link">
            <img alt="Jeoffys logo" class="logo" :src="logoUrl" />
          </a>
        </div>
        <div class="logo-text"><span>Jeoffy's Bookshop</span></div>
        <div class="desktop-menu">
          <ul class="nav-menu" :class="{ active: isMenuOpen }">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/shops">Bookshop</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li class="nav-right">
              <router-link to="/cart"
                >My Cart <span class="cart-badge">2</span></router-link
              >
            </li>
          </ul>
        </div>
        <div class="mobile-nav-toggle" @click="toggleMenu">
          <span class="bar" :class="{ active: isMenuOpen }"></span>
          <span class="bar" :class="{ active: isMenuOpen }"></span>
          <span class="bar" :class="{ active: isMenuOpen }"></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
 import { defineComponent } from 'vue';
import logoUrl from '../../assets/logo.png';
import { createMenuHelpers } from '../../helpers/menu';

 export default defineComponent({
   name: 'AppHeader',
   data() {
     return {
       isMenuOpen: false,
       isDropdownOpen: false,
       logoUrl,
       cleanupClickOutside: null as (() => void) | null,
     }
   },
   created() {
    const helpers = createMenuHelpers(this.$data);
    Object.assign(this, helpers);
  },
   mounted() {
    const helpers = createMenuHelpers(this.$data);
    this.cleanupClickOutside = helpers.setupClickOutside(this.$el as HTMLElement);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
  beforeUnmount() {
    if (this.cleanupClickOutside) {
      this.cleanupClickOutside();
    }
     if (this.toggleMenu) {
      this.toggleMenu();
    }
  }
 });
</script>

<style scoped>
.logo-text {
  display: flex;
  align-items: center;
  padding-right: 3rem;
}
.desktop-menu {
  display: flex;
  align-items: center;
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

.nav-menu li {
  padding: 0 1rem;
}
.nav-menu li.nav-right {
  position: absolute;
  right: 1rem;
}
.nav-item {
  position: relative;
  margin-left: 30px;
}

.nav-link {
  text-decoration: none;
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

.mobile-nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
  position: relative;
  top: 1rem;
}
.cart-badge {
  padding: 0.3rem;
  font-size: small;
  border-radius: 0.5rem;
  background-color: #007bff;
  color: white;
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

  .mobile-nav-toggle {
    display: flex;
  }
}
</style>
