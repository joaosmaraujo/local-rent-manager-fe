<template>
  <div>
    <h1>Houses</h1>
    <router-link tag="b-button" :to="{ name: 'createHouse' }"
      >Add a house</router-link
    >
    <b-table striped :items="houses" :fields="fields">
      <template v-slot:cell(address)="row">
        <router-link
          :to="{ name: 'house', params: { houseId: row.item._id } }"
          >{{ row.item.address }}</router-link
        >
      </template>
      <template v-slot:cell(edit)="row">
        <router-link
          tag="b-button"
          :to="{ name: 'editHouse', params: { houseId: row.item._id } }"
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
        "address",
        "type",
        "ownerId",
        { key: "edit", label: "" },
        { key: "delete", label: "" }
      ],
      houses: []
    };
  },
  async created() {
    this.getHouses();
  },
  methods: {
    async getHouses() {
      this.houses = await api.getAll("houses");
    },
    async confirmDeleteHouse(house) {
      if (confirm(`Are you sure you want to delete ${house.label}?`)) {
        await api.delete("houses", house._id);
      }
    }
  }
};
</script>
