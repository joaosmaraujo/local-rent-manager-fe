<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :color="color"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            :right="right"
            dark
            app
            permanent
        >
            <v-list dense v-if="isLoggedIn">
                <v-list-item two-line :to="{ name: 'userProfile' }" link>
                    <v-list-item-avatar>
                        <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Local Rent Manager</v-list-item-title>
                        <v-list-item-subtitle>{{ user.firstName }} {{ user.lastName }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="item in loggedInItems" :key="item.title" :to="item.path" link>
                    <v-list-item-action>
                        <v-icon>{{ item.action }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.prevent="logoutUser">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list dense v-if="!isLoggedIn">
                <v-list-item two-line>
                    <v-list-item-action>
                        <v-icon>mdi-key-star</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Local Rent Manager</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="item in loggedOutItems" :key="item.title" :to="item.path" link>
                    <v-list-item-action>
                        <v-icon>{{ item.action }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';
export default {
    data() {
        return {
            drawer: true,
            loggedInItems: [
                { title: 'Dashboard', action: 'mdi-view-dashboard', path: { name: 'home' } },
                { title: 'Customers', action: 'mdi-account', path: { name: 'customersList' } },
                { title: 'Houses', action: 'mdi-home-variant-outline', path: { name: 'housesList' } },
                { title: 'Bookings', action: 'mdi-account-card-details', path: { name: 'bookingsList' } },
                { title: 'Tasks', action: 'mdi-clipboard-check-multiple-outline', path: { name: 'tasksList' } },
                { title: 'Works', action: 'mdi-tools', path: { name: 'worksList' } }
            ],
            loggedOutItems: [
                { title: 'Register', action: 'mdi-account-plus', path: { name: 'register' } },
                { title: 'Login', action: 'mdi-login', path: { name: 'login' } },
                { title: 'About', action: 'mdi-information', path: { name: 'about' } }
            ],
            color: 'primary',
            right: false,
            miniVariant: false,
            expandOnHover: false,
            background: false,
            user: {}
        };
    },
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
    async created() {
        this.getUserProfile()
    },
    methods: {
        ...mapActions(['logout']),
        logoutUser() {
            this.logout();
        },
        async getUserProfile() {
            await api.getUserProfile().then((res => {
                this.user = res.user;
            }));
            
        }
    }
};
</script>
