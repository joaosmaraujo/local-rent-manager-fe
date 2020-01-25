<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-row>
                    <v-carousel
                        cycle
                        class="margin-side-10"
                        height="350"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item v-for="totalItem in totalData" :key="totalItem.label">
                            <v-sheet :color="totalItem.color" height="100%">
                                <v-row class="fill-height" align="center" justify="center">
                                    <div class="display-1">
                                        <p style="text-align: center">{{ totalItem.total }}</p>
                                        <p>{{ totalItem.label }}</p>
                                    </div>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row>
                    <v-carousel
                        cycle
                        class="margin-side-10"
                        height="350"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item v-for="usersRanking in usersRankings" :key="usersRanking.key">
                            <v-sheet :color="usersRanking.color" height="100%">
                                <v-row align="center" justify="center">
                                    <div class="title">Top Users by {{ usersRanking.label }}</div>
                                </v-row>
                                <v-row
                                    dense
                                    v-for="usersRankingPosition in usersRanking.data"
                                    :key="usersRankingPosition.username"
                                >
                                    <v-col align="center" justify="center" cols="8">
                                        {{ usersRankingPosition.username }}
                                    </v-col>
                                    <v-col align="center" justify="center" cols="4">
                                        {{ usersRankingPosition[usersRanking.key] }}
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-row>
                    <v-carousel
                        cycle
                        class="margin-side-10"
                        height="350"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item v-for="housesRanking in housesRankings" :key="housesRanking.key">
                            <v-sheet :color="housesRanking.color" height="100%">
                                <v-row align="center" justify="center">
                                    <div class="title">Top Houses by {{ housesRanking.label }}</div>
                                </v-row>
                                <v-row
                                    dense
                                    v-for="housesRankingPosition in housesRanking.data"
                                    :key="housesRankingPosition.label"
                                >
                                    <v-col align="center" justify="center" cols="8">
                                        {{ housesRankingPosition.label }}
                                    </v-col>
                                    <v-col align="center" justify="center" cols="4">
                                        {{ housesRankingPosition[housesRanking.key] }}
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row>
                    <v-carousel
                        cycle
                        class="margin-side-10"
                        height="350"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item v-for="customersRanking in customersRankings" :key="customersRanking.label">
                            <v-sheet :color="customersRanking.color" height="100%">
                                <v-row align="center" justify="center">
                                    <div class="title">Top Customers by {{ customersRanking.label }}</div>
                                </v-row>
                                <v-row
                                    dense
                                    v-for="customersRankingPosition in customersRanking.data"
                                    :key="customersRankingPosition.name"
                                >
                                    <v-col align="center" justify="center" cols="8">
                                        {{ customersRankingPosition.name }}
                                    </v-col>
                                    <v-col align="center" justify="center" cols="4">
                                        {{ customersRankingPosition[customersRanking.key] }}
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import api from '@/api';
import { buildUsersTops, buildHousesTops, buildCustomersTops, buildRankingViewModel } from '@/helpers/rankings.helper';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            customers: [],
            houses: [],
            tasks: [],
            bookings: [],
            LABELS: {
                TOTAL_DATA: {
                    customers: 'Customers',
                    houses: 'Houses Managed',
                    tasks: 'Tasks',
                    bookings: 'Bookings'
                }
            },
            totalData: [
                { label: 'Customers', total: 0, color: 'green' },
                { label: 'Houses Managed', total: 0, color: 'red' },
                { label: 'Tasks', total: 0, color: 'green' },
                { label: 'Bookings', total: 0, color: 'red' }
            ],
            housesRankings: [],
            usersRankings: [],
            customersRankings: []
        };
    },

    computed: {
        ...mapGetters(['user'])
    },

    async created() {
        this.getAllData();
        this.buildUsersRankings();
        this.buildHousesRankings();
        this.buildCustomersRankings();
    },

    methods: {
        async getAllData() {
            this.customers = await api.getAll('customers');
            this.houses = await api.getAll('houses');
            this.tasks = await api.getAll('tasks');
            this.bookings = await api.getAll('bookings');
            this.totalData[0].total = this.customers.length;
            this.totalData[1].total = this.houses.length;
            this.totalData[2].total = this.tasks.length;
            this.totalData[3].total = this.bookings.length;
        },

        async buildUsersRankings() {
            const users = await api.getAll('users');
            const tasks = await api.getAll('tasks');
            const bookings = await api.getAll('bookings');
            const usersTops = buildUsersTops(users, tasks, bookings);
            this.usersRankings = buildRankingViewModel(usersTops, 'USERS');
        },

        async buildHousesRankings() {
            const houses = await api.getAll('houses');
            const tasks = await api.getAll('tasks');
            const housesTops = buildHousesTops(houses, tasks);
            this.housesRankings = buildRankingViewModel(housesTops, 'HOUSES');
        },

        async buildCustomersRankings() {
            const customers = await api.getAll('customers');
            const houses = await api.getAll('houses');
            const tasks = await api.getAll('tasks');
            const customersTops = buildCustomersTops(customers, houses, tasks);
            this.customersRankings = buildRankingViewModel(customersTops, 'CUSTOMERS');
        }
    }
};
</script>
<style>
.margin-side-10 {
    margin-left: 5px;
    margin-right: 5px;
}
</style>
