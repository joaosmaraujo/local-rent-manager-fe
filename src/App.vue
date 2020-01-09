<template>
    <div id="app">
        <b-container id="nav">
            <b-row>
                <b-col cols="3">
                    <b-nav vertical>
                        <b-nav-item v-if="isLoggedIn">
                            <router-link to="/">Home</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="!isLoggedIn">
                            <router-link to="/login">Login</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="!isLoggedIn">
                            <router-link to="/register">Register</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="isLoggedIn">
                            <router-link :to="{ name: 'customersList' }">Customers List</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="isLoggedIn">
                            <router-link :to="{ name: 'housesList' }">Houses List</router-link>
                        </b-nav-item>
                        <b-nav-item  v-if="isLoggedIn">
                            <router-link :to="{ name: 'bookingsList' }">Bookings List</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="isLoggedIn">
                            <router-link :to="{ name: 'worksList' }">Works List</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="isLoggedIn">
                            <router-link :to="{ name: 'tasksList' }">Tasks List</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="isLoggedIn">
                            <a to="/logout" @click.prevent="logoutUser">Logout</a>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link to="/about">About</router-link>
                        </b-nav-item>
                    </b-nav></b-col
                >
                <b-col cols="9"><router-view /></b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
    methods: {
        ...mapActions(['logout']),
        logoutUser() {
            this.logout();
        }
    }
};
</script>
