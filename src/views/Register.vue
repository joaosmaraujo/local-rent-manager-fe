<template>
    <div>
        <h2>Register</h2>
        <b-form @click.prevent="registerUser">
            <b-form-group inline>
                <label for="first-name" class="label">First Name:</label>
                <b-form-input id="first-name" type="text" v-model="firstName"></b-form-input>
            </b-form-group>
            <b-form-group inline>
                <label for="last-name" class="label">Last Name:</label>
                <b-form-input id="last-name" type="text" v-model="lastName"></b-form-input>
            </b-form-group>
            <b-form-group inline>
                <label for="username">Username: </label>
                <b-form-input id="username" type="text" v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group inline>
                <label for="email" class="label">E-mail:</label>
                <b-form-input id="email" type="email" v-model="email"></b-form-input>
            </b-form-group>
            <b-form-group inline>
                <label for="password">Password: </label>
                <b-form-input id="password" type="password" v-model="password"></b-form-input>
            </b-form-group>
            <b-form-group inline>
                <label for="confirm-password">Confirm Password: </label>
                <b-form-input id="confirm-password" type="password" v-model="confirm_password"></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button style="margin-right: 10px;">Submit</b-button>
                <router-link to="/login" tag="b-button">Already have an account?</router-link>
            </b-form-group>
        </b-form>
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
        }
    }
};
</script>

<style></style>
