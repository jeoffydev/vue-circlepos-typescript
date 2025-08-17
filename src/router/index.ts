import {
    createRouter,
    createWebHistory
} from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Shop from '../views/Shop.vue';
import Cart from '../views/Cart.vue';

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
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;