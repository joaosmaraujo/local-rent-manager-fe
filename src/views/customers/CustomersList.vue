<template>
    <div>
        <v-data-table :headers="headers" :items="customers" :search="search" sort-by="firstName" class="elevation-5">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Customers List</v-toolbar-title>
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
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Customer</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.firstName"
                                                label="First Name"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.lastName"
                                                label="Last Name"
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
                <v-icon small class="mr-2" @click="editCustomer(item)">
                    {{ actions.edit }}
                </v-icon>
                <v-icon small @click="deleteCustomer(item)">
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
            headers: [
                { text: 'First Name', value: 'firstName' },
                { text: 'Last Name', value: 'lastName' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            customers: [],
            editedItem: {
                firstName: '',
                lastName: ''
            },
            defaultItem: {
                firstName: '',
                lastName: ''
            },
            actions: { open: 'mdi-open-in-app', edit: 'mdi-pencil', delete: 'mdi-delete' }
        };
    },
    computed: {
        formTitle() {
            return !this.editedItem._id ? 'New Item' : 'Edit Item';
        }
    },

    async created() {
        this.getCustomers();
    },
    methods: {
        async getCustomers() {
            this.customers = await api.getAll('customers');
        },

        open(item) {
            this.$router.push({ name: 'customer', params: { customerId: item._id } });
        },

        editCustomer(item) {
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        async deleteCustomer(item) {
            if (confirm(`Are you sure you want to delete ${item.firstName} ${item.lastName}?`)) {
                await api.delete('customers', item._id).then(() => {
                    this.getCustomers();
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
                api.update('customers', this.editedItem._id, this.editedItem).then(() => {
                    this.getCustomers();
                    this.close();
                });
            } else {
                api.create('customers', this.editedItem).then(() => {
                    this.getCustomers();
                    this.close();
                });
            }
        }
    }
};
</script>
