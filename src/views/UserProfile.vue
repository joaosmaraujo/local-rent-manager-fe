<template>
    <div>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="1">
                        <v-avatar>
                            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                        </v-avatar>
                    </v-col>
                    <v-col cols="7">
                        <span class="headline">{{ user.firstName }} {{ user.lastName }}</span>
                    </v-col>
                    <v-col cols="2">
                        <v-dialog v-model="userDetailsDialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">Edit User</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit User</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                    v-model="user.firstName"
                                                    label="First Name"
                                                    :rules="[inputRules.required]"
                                                    dense
                                                    @keydown.space.prevent
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field
                                                    v-model="user.lastName"
                                                    label="Last Name"
                                                    dense
                                                    @keydown.space.prevent
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                    v-model="user.email"
                                                    label="E-mail"
                                                    :rules="[inputRules.email, inputRules.required]"
                                                    type="email"
                                                    dense
                                                    @keydown.space.prevent
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field
                                                    v-model="user.username"
                                                    label="Username"
                                                    :rules="[inputRules.required]"
                                                    dense
                                                    @keydown.space.prevent
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeChangeDetails">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="saveDetails">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                    <v-col cols="2">
                        <v-dialog v-model="changePasswordDialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">Change Password</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Change Password</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                    v-model="password"
                                                    label="Password"
                                                    :rules="[inputRules.required]"
                                                    type="password"
                                                    dense
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field
                                                    v-model="confirm_password"
                                                    label="Confirm Password"
                                                    :rules="[inputRules.required, inputRules.passwordMatch]"
                                                    type="password"
                                                    dense
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeChangePassword">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="savePassword">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <strong>Username: </strong>
                        </v-col>
                        <v-col cols="10">
                            <span>{{ user.username }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <strong>Email: </strong>
                        </v-col>
                        <v-col cols="10">
                            <span>{{ user.email }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <strong>Tasks Rank: </strong>
                        </v-col>
                        <v-col col="10">
                            <span>#{{ userRanks.tasks }} ({{ user.counters && user.counters.tasks }})</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <strong>Check-in Rank: </strong>
                        </v-col>
                        <v-col cols="10">
                            <span>#{{ userRanks.checkIns }} ({{ user.counters && user.counters.checkIns }})</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <strong>Check-out Rank: </strong>
                        </v-col>
                        <v-col cols="10">
                            <span>#{{ userRanks.checkOuts }} ({{ user.counters && user.counters.checkOuts }})</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <strong>Achievements</strong>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-chip
                                v-for="tasksBadge in userBadges.tasks.bronze"
                                :key="tasksBadge.number"
                                class="ma-2"
                                color="#CD7F32"
                                text-color="black"
                            >
                                <v-avatar left>
                                    <v-icon>mdi-clipboard-check-multiple-outline</v-icon>
                                </v-avatar>
                                30 Tasks Completed
                                <v-avatar right>
                                    <v-icon>mdi-medal</v-icon>
                                </v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col cols="4">
                            <v-chip
                                v-for="checkInBadge in userBadges.checkIns.bronze"
                                :key="checkInBadge.number"
                                class="ma-2"
                                color="#CD7F32"
                                text-color="black"
                            >
                                <v-avatar left>
                                    <v-icon>mdi-home-import-outline</v-icon>
                                </v-avatar>
                                30 Check-in Completed
                                <v-avatar right>
                                    <v-icon>mdi-medal</v-icon>
                                </v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col cols="4">
                            <v-chip
                                v-for="checkOutBadge in userBadges.checkOuts.bronze"
                                :key="checkOutBadge.number"
                                class="ma-2"
                                color="#CD7F32"
                                text-color="black"
                            >
                                <v-avatar left>
                                    <v-icon>mdi-home-export-outline</v-icon>
                                </v-avatar>
                                30 Check-out Completed
                                <v-avatar right>
                                    <v-icon>mdi-medal</v-icon>
                                </v-avatar>
                            </v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-chip
                                v-for="tasksBadge in userBadges.tasks.gold"
                                :key="tasksBadge.number"
                                class="ma-2"
                                color="#FFD700"
                                text-color="black"
                            >
                                <v-avatar left>
                                    <v-icon>mdi-clipboard-check-multiple-outline</v-icon>
                                </v-avatar>
                                100 Tasks Completed
                                <v-avatar right>
                                    <v-icon>mdi-seal</v-icon>
                                </v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col cols="4">
                            <v-chip
                                v-for="checkInBadge in userBadges.checkIns.gold"
                                :key="checkInBadge.number"
                                class="ma-2"
                                color="#FFD700"
                                text-color="black"
                            >
                                <v-avatar left>
                                    <v-icon>mdi-home-import-outline</v-icon>
                                </v-avatar>
                                100 Check-in Completed
                                <v-avatar right>
                                    <v-icon>mdi-seal</v-icon>
                                </v-avatar>
                            </v-chip>
                        </v-col>

                        <v-col cols="4">
                            <v-chip
                                v-for="checkOutBadge in userBadges.checkOuts.gold"
                                :key="checkOutBadge.number"
                                class="ma-2"
                                color="#FFD700"
                                text-color="black"
                            >
                                <v-avatar left>
                                    <v-icon>mdi-home-export-outline</v-icon>
                                </v-avatar>
                                100 Check-out Completed
                                <v-avatar right>
                                    <v-icon>mdi-seal</v-icon>
                                </v-avatar>
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import api from '@/api';
import { buildUserRanks, buildUserBadges } from '@/helpers/rankings.helper';
export default {
    data() {
        return {
            userDetailsDialog: false,
            changePasswordDialog: false,
            inputRules: {
                required: value => !!value || 'Required.',
                passwordMatch: value => {
                    return this.testPasswordMatch(value) || 'Passwords do not match';
                },
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                }
            },
            user: {},
            userRanks: {},
            userBadges: {
                tasks: {
                    bronze: [],
                    gold: []
                },
                checkIns: {
                    bronze: [],
                    gold: []
                },
                checkOuts: {
                    bronze: [],
                    gold: []
                }
            },
            password: '',
            confirm_password: ''
        };
    },
    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    async created() {
        this.getUserProfile();
        this.setUserRanks();
        this.gstUserBadges();
    },
    methods: {
        /**
         * Gets the user profile from the api
         * and assigns it to user.
         * @param 
         * @returns 
         */
        async getUserProfile() {
            await api.getUserProfile().then(res => {
                this.user = res.user;
            });
        },

        /**
         * Sets user ranks
         * @param 
         * @returns 
         */
        async setUserRanks() {
            const users = await api.getAll('users');
            this.userRanks = buildUserRanks(users, this.user._id);
        },

        /**
         * Sets user badges
         * @param 
         * @returns 
         */
        async setUserBadges() {
            await api.getUserProfile().then(res => {
                this.userBadges = buildUserBadges(res.user);
            });
        },

        /**
         * This function tests match between password 
         * and its confirmation
         * @param 
         * @returns 
         */
        testPasswordMatch(value) {
            return this.password === value;
        },

        /**
         * Saves user details
         * @param 
         * @returns 
         */
        saveDetails() {
            api.changeUserDetails(this.user._id, {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                username: this.user.username,
                email: this.user.email
            }).then(() => {
                this.getUserProfile();
                this.closeChangeDetails();
            });
        },

        /**
         * Saves user details
         * @param 
         * @returns 
         */
        savePassword() {
            api.changePassword(this.user._id, {
                password: this.password,
                confirm_password: this.confirm_password
            }).then(() => {
                this.closeChangePassword();
            });
        },

        /**
         * Closes change details dialog
         * @param 
         * @returns 
         */
        closeChangeDetails() {
            this.userDetailsDialog = false;
        },

        /**
         * Closes change password dialog
         * @param 
         * @returns 
         */
        closeChangePassword() {
            this.changePasswordDialog = false;
        }
    }
};
</script>
<style></style>
