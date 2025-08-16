
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import AboutComponent from '../components/AboutComponent.vue';
import ShopsComponent from '../components/ShopsComponent.vue';


const routes = [
  { path: '/', name: 'Home', component: MainPage },
  { path: '/about', name: 'About', component: AboutComponent },
   { path: '/shops', name: 'Shops', component: ShopsComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;