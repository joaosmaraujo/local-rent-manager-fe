<template>
  <div>
    <h1>Houses</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Address</th>
          <th>Type</th>
          <th>Owner ID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="house in houses"
          v-bind:key="house._id"
          @click="selectHouse(house)"
        >
          <td>{{ house._id }}</td>
          <td>{{ house.address }}</td>
          <td>{{ house.type }}</td>
          <td>{{ house.ownerId }}</td>
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
      houses: []
    };
  },
  async created() {
    this.getHouses();
  },
  methods: {
    async getHouses() {
      this.houses = await api.getHouses();
    }
  }
};
</script>
