<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">Register</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="firstName"
                                label="First Name"
                                :rules="[inputRules.required]"
                                dense
                                @keydown.space.prevent
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="lastName"
                                label="Last Name"
                                dense
                                @keydown.space.prevent
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="email"
                                label="E-mail"
                                :rules="[inputRules.email, inputRules.required]"
                                type="email"
                                dense
                                @keydown.space.prevent
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="username"
                                label="Username"
                                :rules="[inputRules.required]"
                                dense
                                @keydown.space.prevent
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="password"
                                label="Password"
                                :rules="[inputRules.required]"
                                type="password"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="confirm_password"
                                label="Confirm Password"
                                :rules="[inputRules.required, rules.passwordMatch]"
                                type="password"
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="registerUser">Register</v-btn>
                <v-btn color="blue darken-1" text @click="redirectToLogin">Already have an account?</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            inputRules: {
                required: value => !!value || 'Required.',
                passwordMatch: value => {
                    return this.testPasswordMatch(value) || 'Passwords do not match';
                },
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                }
            }
        };
    },
    methods: {
        ...mapActions(['register']),
        registerUser() {
            let user = {
                username: this.username,
                password: this.password,
                confirm_password: this.confirm_password,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName
            };

            this.register(user).then(res => {
                if (res.data.success) {
                    this.$router.push({ name: 'login' });
                }
            });
        },
        redirectToLogin() {
            this.$router.push({ name: 'login' });
        },
        testPasswordMatch(value) {
            return this.password === value;
        }
    }
};
</script>

<style></style>
