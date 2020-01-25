import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import About from '../views/About.vue';
import CustomersList from '../views/customers/CustomersList.vue';
import Customer from '../views/customers/Customer.vue';
import WorksList from '../views/works/WorksList.vue';
import HousesList from '../views/houses/HousesList.vue';
import House from '../views/houses/House.vue';
import BookingsList from '../views/bookings/BookingsList.vue';
import TasksList from '../views/tasks/TasksList.vue';
import store from '../store.js';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/user-profile', name: 'userProfile', component: UserProfile, meta: { requiresAuth: true } },
    { path: '/about', name: 'about', component: About, meta: { requiresGuest: true } },
    { path: '/register', name: 'register', component: Register, meta: { requiresGuest: true } },
    { path: '/login', name: 'login', component: Login, meta: { requiresGuest: true } },
    { path: '/customers-list', name: 'customersList', component: CustomersList, meta: { requiresAuth: true } },
    { path: '/customers/:customerId', name: 'customer', component: Customer, meta: { requiresAuth: true } },
    { path: '/works-list', name: 'worksList', component: WorksList, meta: { requiresAuth: true } },
    { path: '/houses-list', name: 'housesList', component: HousesList, meta: { requiresAuth: true } },
    { path: '/houses/:houseId', name: 'house', component: House, meta: { requiresAuth: true } },
    { path: '/bookings-list', name: 'bookingsList', component: BookingsList, meta: { requiresAuth: true } },
    { path: '/tasks-list', name: 'tasksList', component: TasksList, meta: { requiresAuth: true } }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next('/login');
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isLoggedIn) {
            next('/home');
        } else {
            next();
        }
    }
});

export default router;
