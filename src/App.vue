<template>
  <div id="app">
    <b-container id="nav">
      <b-row>
        <b-col cols="3">
          <b-nav vertical>
            <b-nav-item active>
              <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'customersList' }"
                >Customers List</router-link
              >
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'housesList' }"
                >Houses List</router-link
              >
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'bookingsList' }"
                >Bookings List</router-link
              >
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'tasksList' }">Tasks List</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'tasksRegistriesList' }">Tasks Registries List</router-link>
            </b-nav-item>
          </b-nav></b-col
        >
        <b-col cols="9"><router-view /></b-col>
      </b-row>
    </b-container>
  </div>
</template>
