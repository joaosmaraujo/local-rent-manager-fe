<template>
    <div>
        <v-data-table :headers="headers" :items="tasks" sort-by="deadline" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Tasks List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Task</v-btn>
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
                                            <v-select
                                                :items="works"
                                                item-text="name"
                                                v-model="editedItem.work"
                                                label="Work to be done"
                                                dense
                                                outlined
                                                return-object
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                type="number"
                                                v-model="editedItem.cost"
                                                label="Cost"
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-menu
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="editedItem.deadline"
                                                        label="Deadline"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="editedItem.deadline"
                                                    @input="menu = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                                :items="[true, false]"
                                                v-model="editedItem.completed"
                                                label="Completed"
                                                dense
                                                outlined
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="saveTask(editedItem)">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.deadline="{ item }">
                <span>{{ item.deadline | formatDate }}</span>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editTask(item)">
                    {{ actions.edit }}
                </v-icon>
                <v-icon small class="mr-2" @click="deleteTask(item)">
                    {{ actions.delete }}
                </v-icon>
                <v-icon small :color="'green'" class="mr-2" @click="completeTask(item)" v-if="!item.completed">
                    {{ actions.check }}
                </v-icon>
                <v-icon small :color="'red'" class="mr-2" @click="uncompleteTask(item)" v-if="item.completed">
                    {{ actions.uncheck }}
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
            menu: false,
            dialog: false,
            headers: [
                { text: 'House', value: 'house.label' },
                { text: 'Work', value: 'work.name' },
                { text: 'Cost', value: 'cost' },
                { text: 'Deadline', value: 'deadline' },
                { text: 'Completed', value: 'completed' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            houses: [],
            works: [],
            tasks: [],
            editedItem: {
                house: '',
                work: '',
                cost: 0,
                deadline: '',
                completed: false
            },
            defaultItem: {
                house: '',
                work: '',
                cost: 0,
                deadline: '',
                completed: false
            },
            actions: { edit: 'mdi-pencil', delete: 'mdi-delete', check: 'mdi-check-bold', uncheck: 'mdi-close-circle' }
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
        this.getHouses();
        this.getWorks();
        this.getTasks();
    },
    methods: {
        async getHouses() {
            this.houses = await api.getAll('houses');
        },

        async getWorks() {
            this.works = await api.getAll('works');
        },

        async getTasks() {
            this.tasks = await api.getAll('tasks');
        },

        editTask(item) {
            this.editedItem = Object.assign({}, item, {
                deadline: new Date(item.deadline).toISOString().substr(0, 10)
            });
            this.dialog = true;
        },

        async deleteTask(item) {
            if (confirm(`Are you sure you want to delete ${item._id}?`)) {
                await api.delete('tasks', item._id).then(() => {
                    this.getTasks();
                });
            }
        },

        async completeTask(item) {
            item.completed = true;
            this.saveTask(item);
        },

        async uncompleteTask(item) {
            item.completed = false;
            this.saveTask(item);
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
            }, 300);
        },

        saveTask(editedItem) {
            if (editedItem._id) {
                api.update('tasks', editedItem._id, editedItem).then(() => {
                    this.getTasks();
                    this.close();
                });
            } else {
                api.create('tasks', editedItem).then(() => {
                    this.getTasks();
                    this.close();
                });
            }
        }
    }
};
</script>
