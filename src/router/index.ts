import {
  createRouter,
  createWebHistory
} from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Shop from '../views/Shop.vue';
import BookDetail from '../views/BookDetail.vue';

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/about',
  name: 'About',
  component: About
},
{
  path: '/shops',
  name: 'Shops',
  component: Shop
},
{
  path: '/book/:id',
  name: 'BookDetail',
  component: BookDetail,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;