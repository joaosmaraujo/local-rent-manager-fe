<template>
    <div>
        <v-data-table :headers="headers" :items="bookings" :search="search" sort-by="checkInDate" class="elevation-5">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Bookings List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Booking</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.guestFirstName"
                                                label="Guest First Name"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.guestLastName"
                                                label="Guest First Name"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="houses"
                                                item-text="label"
                                                v-model="editedItem.house"
                                                label="House"
                                                dense
                                                outlined
                                                return-object
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-menu
                                                v-model="menuCheckInDate"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="editedItem.checkInDate"
                                                        label="Check-in"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-on="on"
                                                        dense
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="editedItem.checkInDate"
                                                    @input="menuCheckInDate = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-menu
                                                v-model="menuCheckOutDate"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="editedItem.checkOutDate"
                                                        label="Check-in"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-on="on"
                                                        dense
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="editedItem.checkOutDate"
                                                    @input="menuCheckOutDate = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.checkInDate="{ item }">
                <span>{{ item.checkInDate | formatDate }}</span>
            </template>
            <template v-slot:item.checkOutDate="{ item }">
                <span>{{ item.checkOutDate | formatDate }}</span>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editBooking(item)">
                    {{ actions.edit }}
                </v-icon>
                <v-icon small @click="deleteBooking(item)">
                    {{ actions.delete }}
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import api from '@/api';
export default {
    data() {
        return {
            dialog: false,
            search: '',
            menuCheckInDate: false,
            menuCheckOutDate: false,
            headers: [
                { text: 'House', value: 'house.label' },
                { text: 'Guest First Name', value: 'guestFirstName' },
                { text: 'Guest Last Name', value: 'guestLastName' },
                { text: 'Check-in', value: 'checkInDate' },
                { text: 'Check-out', value: 'checkOutDate' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            houses: [],
            bookings: [],
            editedItem: {
                house: '',
                guestFirstName: '',
                guestLastName: '',
                checkInDate: '',
                checkOutDate: ''
            },
            defaultItem: {
                house: '',
                guestFirstName: '',
                guestLastName: '',
                checkInDate: '',
                checkOutDate: ''
            },
            actions: { edit: 'mdi-pencil', delete: 'mdi-delete' }
        };
    },

    computed: {
        formTitle() {
            return !this.editedItem._id ? 'New Booking' : 'Edit Booking';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    async created() {
        this.getHouses();
        this.getBookings();
    },
    methods: {
        async getHouses() {
            this.houses = await api.getAll('houses');
        },

        async getBookings() {
            this.bookings = await api.getAll('bookings');
        },

        editBooking(item) {
            this.editedItem = Object.assign(
                {},
                item,
                { checkInDate: new Date(item.checkInDate).toISOString().substr(0, 10) },
                { checkOutDate: new Date(item.checkOutDate).toISOString().substr(0, 10) }
            );
            this.dialog = true;
        },

        async deleteBooking(item) {
            if (confirm(`Are you sure you want to delete ${item._id}?`)) {
                await api.delete('bookings', item._id).then(() => {
                    this.getBookings();
                });
            }
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
            }, 300);
        },

        save() {
            if (this.editedItem._id) {
                api.update('bookings', this.editedItem._id, this.editedItem).then(() => {
                    this.getBookings();
                    this.close();
                });
            } else {
                api.create('bookings', this.editedItem).then(() => {
                    this.getBookings();
                    this.close();
                });
            }
        }
    }
};
</script>
