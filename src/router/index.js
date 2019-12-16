import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("../views/Customers.vue")
  },
  {
    path: "/bookings",
    name: "bookings",
    component: () => import("../views/Bookings.vue")
  },
  {
    path: "/houses",
    name: "houses",
    component: () => import("../views/Houses.vue")
  },
  {
    path: "/tasks-registries",
    name: "tasks-registries",
    component: () => import("../views/TasksRegistries.vue")
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("../views/Tasks.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
