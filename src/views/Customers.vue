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
import api from '@/api'
export default {
  data () {
    return {
      customers: []
    }
  },
  async created () {
    this.getCustomers()
  },
  methods: {
    async getCustomers () {
      this.customers = await api.getCustomers()
      this.loading = false
    },
  }
}
</script>

<style scoped>
.list-horizontal li {
  display: inline-block;
}

.list-horizontal li:before {
  content: "\00a0\2022\00a0\00a0";

  color: #999;

  color: rgba(0, 0, 0, 0.5);

  font-size: 11px;
}

.list-horizontal li:first-child:before {
  content: "";
}
</style>
