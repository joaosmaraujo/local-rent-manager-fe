<template>
    <div>
        <h1>{{ customer.lastName }}, {{ customer.firstName }}</h1>
        <h2>Houses</h2>
        <b-table striped :items="customer.houses" :fields="fields"> </b-table>
    </div>
</template>
<script>
import api from '@/api';

export default {
    data() {
        return {
            fields: ['address', 'type'],
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
        }
    }
};
</script>
