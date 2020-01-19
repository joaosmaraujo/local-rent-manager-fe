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
                            <v-text-field v-model="firstName" label="First Name" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="lastName" label="Last Name" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="email" label="E-mail" type="email" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="username" label="Username" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="password" label="Password" type="password" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="confirm_password"
                                label="Confirm Password"
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
            confirm_password: ''
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
        }
    }
};
</script>

<style></style>
