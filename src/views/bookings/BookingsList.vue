<template>
    <div>
        <v-data-table :headers="headers" :items="bookings" sort-by="label" class="elevation-2">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Bookings List</v-toolbar-title>
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
                                            <v-text-field
                                                v-model="editedItem.guestFirstName"
                                                label="Guest First Name"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.guestLastName"
                                                label="Guest First Name"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.checkInDate"
                                                label="Deadline"
                                                prepend-icon="mdi-event"
                                                type="date"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.checkOutDate"
                                                label="Deadline"
                                                prepend-icon="mdi-event"
                                                type="date"
                                                dense
                                            ></v-text-field>
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
            editedIndex: -1,
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
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
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
            console.log(item);
            /* this.editedIndex = this.tasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true; */
        },

        async deleteBooking(item) {
            if (confirm(`Are you sure you want to delete ${item._id}?`)) {
                await api.delete('tasks', item._id).then(() => {
                    this.getTasks();
                });
            }
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            /* if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close(); */
        }
    }
};
</script>
