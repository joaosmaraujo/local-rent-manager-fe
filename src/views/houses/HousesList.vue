<template>
    <div>
        <v-data-table :headers="headers" :items="houses" :search="search" sort-by="label" class="elevation-5">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Houses List</v-toolbar-title>
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
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.label" label="Label" dense></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="owners"
                                                item-text="lastName"
                                                v-model="editedItem.owner"
                                                label="Customer"
                                                dense
                                                outlined
                                                return-object
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.type" label="Type" dense></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.address"
                                                label="Address"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.city" label="City" dense></v-text-field>
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
            headers: [
                {
                    text: 'Label',
                    align: 'left',
                    value: 'label'
                },
                { text: 'Owner', value: 'owner.lastName' },
                { text: 'Type', value: 'type' },
                { text: 'Address', value: 'address' },
                { text: 'City', value: 'city' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            houses: [],
            owners: [],
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
            return !this.editedItem._id ? 'New Item' : 'Edit Item';
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    async created() {
        this.getOwners();
        this.getHouses();
    },
    methods: {
        async getHouses() {
            this.houses = await api.getAll('houses');
        },

        async getOwners() {
            this.owners = await api.getAll('customers');
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
                    this.getHouses();
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
                api.update('houses', this.editedItem._id, this.editedItem).then(() => {
                    this.getHouses();
                    this.close();
                });
            } else {
                api.create('houses', this.editedItem).then(() => {
                    this.getHouses();
                    this.close();
                });
            }
        }
    }
};
</script>
