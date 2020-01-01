import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CustomersList from "../views/CustomersList.vue";
import Customer from "../views/Customer.vue";
import CreateEditCustomer from "../views/CreateEditCustomer.vue";
import WorksList from "../views/WorksList.vue";
import Work from "../views/Work.vue";
import CreateEditWork from "../views/CreateEditWork.vue";
import HousesList from "../views/HousesList.vue";
import House from "../views/House.vue";
import CreateEditHouse from "../views/CreateEditHouse.vue";
import BookingsList from "../views/BookingsList.vue";
import Booking from "../views/Booking.vue";
import CreateEditBooking from "../views/CreateEditBooking.vue";
import TasksRegistriesList from "../views/TasksRegistriesList.vue";
import TaskRegistry from "../views/TaskRegistry.vue";
import CreateEditTaskRegistry from "../views/CreateEditTaskRegistry.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/customers-list", name: "customersList", component: CustomersList },
  { path: "/customers/:customerId", name: "customer", component: Customer },
  {
    path: "/customers/create",
    name: "createCustomer",
    component: CreateEditCustomer
  },
  {
    path: "/customers/:customerId/edit",
    name: "editCustomer",
    component: CreateEditCustomer
  },
  { path: "/works-list", name: "worksList", component: WorksList },
  { path: "/works/:workId", name: "work", component: Work },
  { path: "/works/create", name: "createWork", component: CreateEditWork },
  { path: "/works/:workId/edit", name: "editWork", component: CreateEditWork },
  { path: "/houses-list", name: "housesList", component: HousesList },
  { path: "/houses/:houseId", name: "house", component: House },
  { path: "/houses/create", name: "createHouse", component: CreateEditHouse },
  {
    path: "/houses/:houseId/edit",
    name: "editHouse",
    component: CreateEditHouse
  },
  { path: "/bookings-list", name: "bookingsList", component: BookingsList },
  { path: "/bookings/:bookingId", name: "booking", component: Booking },
  {
    path: "/bookings/create",
    name: "createBooking",
    component: CreateEditBooking
  },
  {
    path: "/bookings/:bookingId/edit",
    name: "editBooking",
    component: CreateEditBooking
  },
  {
    path: "/tasks-registries-list",
    name: "tasksRegistriesList",
    component: TasksRegistriesList
  },
  {
    path: "/tasks-registries/:taskRegistryId",
    name: "taskRegistry",
    component: TaskRegistry
  },
  {
    path: "/tasks-registries/create",
    name: "createTaskRegistry",
    component: CreateEditTaskRegistry
  },
  {
    path: "/tasks-registries/:taskRegistryId/edit",
    name: "editTaskRegistry",
    component: CreateEditTaskRegistry
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
