<template>
  <div>
    <h1>Customers</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          v-bind:key="customer._id"
          @click="selectCustomer(customer)"
        >
          <td>{{ customer._id }}</td>
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      customers: []
    };
  },
  async created() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      this.customers = await api.getCustomers();
    }
  }
};
</script>
