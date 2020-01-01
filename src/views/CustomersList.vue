<template>
  <div>
    <h1>Customers</h1>
    <router-link tag="b-button" :to="{ name: 'createCustomer' }"
      >Add a customer</router-link
    >
    <b-table striped :items="customers" :fields="fields">
      <template v-slot:cell(lastName)="row">
        <router-link
          :to="{ name: 'customer', params: { customerId: row.item._id } }"
          >{{ row.item.lastName }}</router-link
        >
      </template>
      <template v-slot:cell(edit)="row">
        <router-link
          tag="b-button"
          :to="{ name: 'editCustomer', params: { customerId: row.item._id } }"
          >Edit</router-link
        >
      </template>
      <template v-slot:cell(delete)="row">
        <b-button @click="confirmDeleteCustomer(row.item)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      fields: [
        "lastName",
        "firstName",
        { key: "edit", label: "" },
        { key: "delete", label: "" }
      ],
      customers: []
    };
  },
  async created() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      this.customers = await api.getAll("customers");
    },
    async confirmDeleteCustomer(customer) {
      if (
        confirm(
          `Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`
        )
      ) {
        await api.delete("customers", customer._id).then(() => {
          this.getCustomers();
        });
      }
    }
  }
};
</script>
