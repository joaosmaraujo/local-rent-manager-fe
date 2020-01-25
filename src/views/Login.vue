<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">Login</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="username" label="Username" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="password" label="Password" type="password" dense></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="loginUser">Login</v-btn>
                <v-btn color="blue darken-1" text @click="redirectToRegister">Need an account?</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(['login']),
        loginUser() {
            let user = {
                username: this.username,
                password: this.password
            };

            this.login(user)
                .then(res => {
                    if (res.success) {
                        this.$router.push({ name: 'home' });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        redirectToRegister() {
            this.$router.push({ name: 'register' });
        }
    }
};
</script>
<style></style>
