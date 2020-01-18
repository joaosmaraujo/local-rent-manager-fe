<template>
    <div>
        <v-data-table :headers="headers" :items="works" sort-by="label" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Works List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Work</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Name" dense></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="['weekly', 'monthly']"
                                                v-model="editedItem.frequency"
                                                label="Frequency"
                                                dense
                                                outlined
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.advance"
                                                label="Advance (days)"
                                                type="number"
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
                <v-icon small class="mr-2" @click="editWork(item)">
                    {{ actions.edit }}
                </v-icon>
                <v-icon small @click="deleteWork(item)">
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
                { text: 'Name', value: 'name' },
                { text: 'Frequency', value: 'frequency' },
                { text: 'Advance', value: 'advance' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            works: [],
            editedItem: {
                name: '',
                frequency: '',
                advance: 0
            },
            defaultItem: {
                name: '',
                frequency: '',
                advance: 0
            },
            actions: { edit: 'mdi-pencil', delete: 'mdi-delete' }
        };
    },

    computed: {
        formTitle() {
            return !this.editedItem._id ? 'New Item' : 'Edit Item';
        }
    },

    async created() {
        this.getWorks();
    },

    methods: {
        async getWorks() {
            this.works = await api.getAll('works');
        },

        editWork(item) {
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        async deleteWork(item) {
            if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                await api.delete('works', item._id).then(() => {
                    this.getWorks();
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
                api.update('works', this.editedItem._id, this.editedItem).then(() => {
                    this.getWorks();
                    this.close();
                });
            } else {
                api.create('works', this.editedItem).then(() => {
                    this.getWorks();
                    this.close();
                });
            }
        }
    }
};
</script>
