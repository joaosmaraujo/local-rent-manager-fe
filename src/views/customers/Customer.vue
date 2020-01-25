<template>
    <div>
        <h1>{{ customer.lastName }}, {{ customer.firstName }}</h1>
        <h3>Houses: {{ customer.houses && customer.houses.length }}</h3>
        <h3>Bookings: {{ customer.numberOfBookings && customer.numberOfBookings }}</h3>
        <h3>Tasks: {{ customer.numberOfTasks && customer.numberOfTasks }}</h3>
        <h3>Total Cost: {{ customer.totalCost }}</h3>
        <v-data-table :headers="headers" :items="customer.houses" :search="search" sort-by="label" class="elevation-5">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Customer Houses</v-toolbar-title>
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
                            <v-btn color="primary" dark class="mb-2" v-on="on">New House</v-btn>
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
                                                v-model="editedItem.label"
                                                :rules="[inputRules.required]"
                                                label="Label"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.type"
                                                label="Type"
                                                :rules="[inputRules.required]"
                                                @keydown.space.prevent
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.address"
                                                :rules="[inputRules.required]"
                                                label="Address"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.city"
                                                :rules="[inputRules.required]"
                                                label="City"
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
                <v-icon small class="mr-2" @click="open(item)">
                    {{ actions.open }}
                </v-icon>
                <v-icon small class="mr-2" @click="editHouse(item)">
                    {{ actions.edit }}
                </v-icon>
                <v-icon small @click="deleteHouse(item)">
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
            inputRules: {
                required: value => !!value || 'Required.'
            },
            headers: [
                {
                    text: 'Label',
                    align: 'left',
                    value: 'label'
                },
                { text: 'Type', value: 'type' },
                { text: 'Address', value: 'address' },
                { text: 'City', value: 'city' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            customer: {},
            editedItem: {
                label: '',
                owner: '',
                type: '',
                address: '',
                city: ''
            },
            defaultItem: {
                label: '',
                owner: '',
                type: '',
                address: '',
                city: ''
            },
            actions: { open: 'mdi-open-in-app', edit: 'mdi-pencil', delete: 'mdi-delete' }
        };
    },
    computed: {
        formTitle() {
            return !this.editedItem._id ? 'New House' : 'Edit House';
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    async created() {
        if ('customerId' in this.$route.params) {
            this.getCustomer(this.$route.params.customerId);
        }
    },

    methods: {
        async getCustomer(_id) {
            this.customer = await api.get('customers', _id);
            this.customer.numberOfTasks = this.getNumberOf(this.customer.houses, 'tasks');
            this.customer.numberOfBookings = this.getNumberOf(this.customer.houses, 'bookings');
            this.customer.totalCost = this.getTotalCost(this.customer.houses);
        },

        getNumberOf(houses, prop) {
            return houses.reduce((total, house) => total + house[prop].length, 0);
        },

        getTotalCost(houses) {
            return houses
                .reduce((total, house) => total.concat(house.tasks), [])
                .reduce((totalCost, task) => totalCost + task.cost, 0);
        },

        open(item) {
            this.$router.push({ name: 'house', params: { houseId: item._id } });
        },

        editHouse(item) {
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        async deleteHouse(item) {
            if (confirm(`Are you sure you want to delete ${item.label}?`)) {
                await api.delete('houses', item._id).then(() => {
                    this.getCustomer(this.$route.params.customerId);
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
                this.editedItem.owner = this.customer;
                api.update('houses', this.editedItem._id, this.editedItem).then(() => {
                    this.getCustomer(this.$route.params.customerId);
                    this.close();
                });
            } else {
                this.editedItem.owner = this.customer;
                api.create('houses', this.editedItem).then(() => {
                    this.getCustomer(this.$route.params.customerId);
                    this.close();
                });
            }
        }
    }
};
</script>
