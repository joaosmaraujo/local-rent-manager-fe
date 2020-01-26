<template>
    <div>
        <h1>{{ house.label }}</h1>
        <h3>Bookings: {{ house.bookings && house.bookings.length }}</h3>
        <h3>Tasks: {{ house.tasks && house.tasks.length }}</h3>
        <h3>Total Cost: {{ house.totalCost }}</h3>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="bookingsHeaders"
                    :items="house.bookings"
                    :search="searchBooking"
                    sort-by="label"
                    class="elevation-5"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>Bookings</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="searchBooking"
                                append-icon="mdi-search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="bookingDialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">New Booking</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ bookingFormTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field
                                                        v-model="editedBooking.guestFirstName"
                                                        label="Guest First Name"
                                                        :rules="[inputRules.required]"
                                                        dense
                                                        @keydown.space.prevent
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field
                                                        v-model="editedBooking.guestLastName"
                                                        label="Guest Last Name"
                                                        :rules="[inputRules.required]"
                                                        dense
                                                        @keydown.space.prevent
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
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
                                                                v-model="editedBooking.checkInDate"
                                                                label="Check-in"
                                                                :rules="[inputRules.required]"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-on="on"
                                                                dense
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="editedBooking.checkInDate"
                                                            @input="menuCheckInDate = false"
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
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
                                                                v-model="editedBooking.checkOutDate"
                                                                label="Check-out"
                                                                :rules="[inputRules.required, inputRules.checkOut]"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-on="on"
                                                                dense
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="editedBooking.checkOutDate"
                                                            @input="menuCheckOutDate = false"
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeBooking">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="saveBooking">Save</v-btn>
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
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="tasksHeaders"
                    :items="house.tasks"
                    :search="searchTask"
                    sort-by="label"
                    class="elevation-5"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>Tasks</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="searchTask"
                                append-icon="mdi-search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="taskDialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">New Task</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ taskFormTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-select
                                                        :items="works"
                                                        item-text="name"
                                                        v-model="editedTask.work"
                                                        label="Work to be done"
                                                        :rules="[inputRules.required]"
                                                        dense
                                                        outlined
                                                        return-object
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-select
                                                        :items="[true, false]"
                                                        v-model="editedTask.completed"
                                                        label="Completed"
                                                        dense
                                                        outlined
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-menu
                                                        v-model="menuDeadline"
                                                        :close-on-content-click="false"
                                                        :nudge-right="40"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                v-model="editedTask.deadline"
                                                                label="Deadline"
                                                                :rules="[inputRules.required]"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-on="on"
                                                                dense
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="editedTask.deadline"
                                                            @input="menu = false"
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field
                                                        type="number"
                                                        v-model="editedTask.cost"
                                                        :rules="[inputRules.required, inputRules.minValue]"
                                                        label="Cost"
                                                        dense
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeTask">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="saveTask">Save</v-btn>
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
                        <v-icon small @click="deleteTask(item)">
                            {{ actions.delete }}
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            house: {},
            bookingDialog: false,
            menuCheckInDate: false,
            menuCheckOutDate: false,
            menuDeadline: false,
            searchBooking: '',
            searchTask: '',
            inputRules: {
                required: value => !!value || 'Required.',
                minValue: value => value >= 0 || 'Value must be equal or greater than zero.',
                checkOut: value => {
                    return this.validateCheckout(value) || 'Check-out must be later than check-in.';
                }
            },
            bookingsHeaders: [
                { text: 'Guest First Name', value: 'guestFirstName' },
                { text: 'Guest Last Name', value: 'guestLastName' },
                { text: 'Check-in', value: 'checkInDate' },
                { text: 'Check-out', value: 'checkOutDate' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedBooking: {
                house: '',
                guestFirstName: '',
                guestLastName: '',
                checkInDate: '',
                checkOutDate: ''
            },
            defaultBooking: {
                house: '',
                guestFirstName: '',
                guestLastName: '',
                checkInDate: '',
                checkOutDate: ''
            },
            taskDialog: false,
            tasksHeaders: [
                { text: 'Work', value: 'work.name' },
                { text: 'Cost', value: 'cost' },
                { text: 'Deadline', value: 'deadline' },
                { text: 'Completed', value: 'completed' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            works: [],
            editedTask: {
                house: '',
                work: '',
                cost: 0,
                deadline: '',
                completed: false
            },
            defaultTask: {
                house: '',
                work: '',
                cost: 0,
                deadline: '',
                completed: false
            },
            actions: { edit: 'mdi-pencil', delete: 'mdi-delete' }
        };
    },

    computed: {
        bookingFormTitle() {
            return !this.editedBooking._id ? 'New Booking' : 'Edit Booking';
        },
        taskFormTitle() {
            return !this.editedTask._id ? 'New Task' : 'Edit Task';
        }
    },

    watch: {
        bookingDialog(val) {
            val || this.closeBooking();
        },
        taskDialog(val) {
            val || this.closeTask();
        }
    },

    async created() {
        this.getWorks();
        if ('houseId' in this.$route.params) {
            await this.getHouse(this.$route.params.houseId);
        }
    },

    methods: {
        async getHouse(_id) {
            this.house = await api.get('houses', _id);
            this.house.totalCost = this.getTotalCost(this.house.tasks);
        },

        getTotalCost(tasks) {
            return tasks.reduce((totalCost, task) => totalCost + task.cost, 0);
        },

        editBooking(item) {
            this.editedBooking = Object.assign(
                {},
                item,
                { checkInDate: new Date(item.checkInDate).toISOString().substr(0, 10) },
                { checkOutDate: new Date(item.checkOutDate).toISOString().substr(0, 10) }
            );
            this.bookingDialog = true;
        },

        async deleteBooking(item) {
            if (confirm(`Are you sure you want to delete ${item._id}?`)) {
                await api.delete('bookings', item._id).then(() => {
                    this.getHouse(this.$route.params.houseId);
                });
            }
        },

        closeBooking() {
            this.bookingDialog = false;
            setTimeout(() => {
                this.editedBooking = Object.assign({}, this.defaultBooking);
            }, 300);
        },

        saveBooking() {
            if (this.editedBooking._id) {
                this.editedBooking.house = this.house;
                api.update('bookings', this.editedBooking._id, this.editedBooking).then(() => {
                    this.getHouse(this.$route.params.houseId);
                    this.closeBooking();
                });
            } else {
                this.editedBooking.house = this.house;
                api.create('bookings', this.editedBooking).then(() => {
                    this.getHouse(this.$route.params.houseId);
                    this.closeBooking();
                });
            }
        },

        async getWorks() {
            this.works = await api.getAll('works');
        },

        editTask(item) {
            this.editedTask = Object.assign({}, item, {
                deadline: new Date(item.deadline).toISOString().substr(0, 10)
            });
            this.taskDialog = true;
        },

        async deleteTask(item) {
            if (confirm(`Are you sure you want to delete ${item._id}?`)) {
                await api.delete('tasks', item._id).then(() => {
                    this.getHouse(this.$route.params.houseId);
                });
            }
        },

        closeTask() {
            this.taskDialog = false;
            setTimeout(() => {
                this.editedTask = Object.assign({}, this.defaultTask);
            }, 300);
        },

        saveTask() {
            if (this.editedTask._id) {
                this.editedTask.house = this.house;
                api.update('tasks', this.editedTask._id, this.editedTask).then(() => {
                    this.getHouse(this.$route.params.houseId);
                    this.closeTask();
                });
            } else {
                this.editedTask.house = this.house;
                api.create('tasks', this.editedTask).then(() => {
                    this.getHouse(this.$route.params.houseId);
                    this.closeTask();
                });
            }
        },

        validateCheckout(checkOutDate) {
            return new Date(checkOutDate).toDateString() >= new Date(this.editedItem.checkInDate).toDateString();
        }
    }
};
</script>
