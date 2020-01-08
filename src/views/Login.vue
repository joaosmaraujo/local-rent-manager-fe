<template>
    <div>
        <h2>Login</h2>
        <b-form @click.prevent="loginUser">
            <b-form-group inline>
                <label for="username">Username: </label>
                <b-form-input id="username" type="text" v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group inline>
                <label for="password">Password: </label>
                <b-form-input id="password" type="password" v-model="password"></b-form-input>
            </b-form-group>
            <b-button style="margin-right: 10px;">Submit</b-button>
            <router-link to="/register" tag="b-button">Need an account?</router-link>
        </b-form>
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
                    console.log(res);
                    if (res.data.success) {
                        this.$router.push({ name: 'customersList' });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style></style>
