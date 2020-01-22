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
                        <v-carousel-item v-for="usersRanking in usersRankings" :key="usersRanking.label">
                            <v-sheet :color="usersRanking.color" height="100%">
                                <v-row class="fill-height" align="center" justify="center">
                                    <div class="display-1">{{ usersRanking.label }}</div>
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
                        <v-carousel-item v-for="customersRanking in customersRankings" :key="customersRanking.label">
                            <v-sheet :color="customersRanking.color" height="100%">
                                <v-row class="fill-height" align="center" justify="center">
                                    <div class="display-1">{{ customersRanking.label }}</div>
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
                        <v-carousel-item v-for="housesRanking in housesRankings" :key="housesRanking.label">
                            <v-sheet :color="housesRanking.color" height="100%">
                                <v-row align="center" justify="center">
                                    <div class="display-1">{{ housesRanking.label }}</div>
                                </v-row>
                                <v-row dense v-for="housesRankingPosition in housesRanking.data" :key="housesRankingPosition.label">
                                    <v-col align="center" justify="center" cols="8">
                                        {{ housesRankingPosition.label }}
                                    </v-col>
                                    <v-col align="center" justify="center" cols="4">
                                        {{ housesRankingPosition.tasks }}
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
import { buildRankingsForUsers, buildRankingsForHouses, buildRankingsForCustomers } from '@/helpers/rankings.helper';

export default {
    data() {
        return {
            customers: [],
            houses: [],
            tasks: [],
            bookings: [],
            totalData: [
                { label: 'Customers', total: 0, color: 'red' },
                { label: 'Houses Managed', total: 0, color: 'warning' },
                { label: 'Tasks Completed/Registered', total: 'X/Y', color: 'teal' },
                { label: 'Check-in Completed/Bookings', total: 'Y/Z', color: 'brown' },
                { label: 'Check-out Completed/Bookings', total: 'Y/Z', color: 'cyan darken-1' }
            ],
            usersRankings: [
                { label: 'Tasks', color: 'warning' },
                { label: 'Check-ins', color: 'teal' },
                { label: 'Check-outs', color: 'pink darken-2' }
            ],
            customersRankings: [
                { label: 'Tasks', color: 'lime darken-1' },
                { label: 'Bookings', color: 'red' },
                { label: 'cost', color: 'purple lighten-3' }
            ],
            housesRankings: [
                { label: 'Tasks', color: 'primary', data: [] },
                { label: 'Bookings', color: 'brown' },
                { label: 'Costs', color: 'cyan darken-1' }
            ]
        };
    },

    async created() {
        this.getAllData();
        //this.buildUsersRankings();
        this.buildHousesRankings();
        //this.buildCustomersRankings();
    },

    methods: {
        async getAllData() {
            this.customers = await api.getAll('customers');
            this.totalData[0].total = this.customers.length;
            this.houses = await api.getAll('houses');
            this.totalData[1].total = this.houses.length;
            this.tasks = await api.getAll('tasks');
            this.totalData[2].total = this.tasks.length;
            this.bookings = await api.getAll('bookings');
            this.totalData[3].total = this.bookings.length;
            this.totalData[4].total = this.bookings.length;
        },

        async buildUsersRankings() {
            const users = await api.getAll('users');
            const tasks = await api.getAll('tasks');
            const bookings = await api.getAll('bookings');
            const rankings = buildRankingsForUsers(users, tasks, bookings);
            console.log(rankings);
        },

        async buildHousesRankings() {
            const houses = await api.getAll('houses');
            const tasks = await api.getAll('tasks');
            const housesRankings = buildRankingsForHouses(houses, tasks);
            this.housesRankings[0].data = housesRankings.tasks;
            console.log(this.housesRankings);
        },

        async buildCustomersRankings() {
            const customers = await api.getAll('customers');
            const houses = await api.getAll('houses');
            const tasks = await api.getAll('tasks');
            const usersRankings = buildRankingsForCustomers(customers, houses, tasks);
            console.log(usersRankings);
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
