<template>
    <div>
        <router-link :to="{ name: 'customersList' }">View all customers</router-link>
        <b-form>
            <b-input-group inline>
                <label for="first-name">First Name: </label>
                <b-input id="first-name" v-model="customer.firstName"></b-input>
            </b-input-group>
            <b-input-group inline>
                <label for="last-name">Last Name: </label>
                <b-input id="last-name" v-model="customer.lastName"></b-input>
            </b-input-group>
            <b-input-group>
                <b-button @click.prevent="saveCustomer">Submit</b-button>
                <router-link :to="{ name: 'customersList' }" tag="b-button">Cancel</router-link>
            </b-input-group>
        </b-form>
    </div>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            customer: {}
        };
    },

    async created() {
        if ('customerId' in this.$route.params) {
            this.getCustomer(this.$route.params.customerId);
        }
    },

    methods: {
        async getCustomer(_id) {
            this.customer = await api.get('customers', _id);
        },
        saveCustomer() {
            if ('customerId' in this.$route.params) {
                api.update('customers', this.customer._id, this.customer).then(() => {
                    this.$router.push({ name: 'customersList' });
                });
            } else {
                api.create('customers', this.customer).then(() => {
                    this.$router.push({ name: 'customersList' });
                });
            }
        }
    }
};
</script>
