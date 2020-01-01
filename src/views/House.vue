<template>
  <div>
    <h1>{{ house.label }}</h1>
    <h2>Next Bookings</h2>
    <b-table striped :items="house.bookings" :fields="bookingsFields"></b-table>
    <h2>Next Tasks</h2>
    <b-table
      striped
      :items="house.tasksRegistries"
      :fields="tasksRegistriesFields"
    ></b-table>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      bookingsFields: [
        "guestLastName",
        "guestFirstName",
        "checkInDate",
        "checkOutDate"
      ],
      tasksRegistriesFields: ["cost", "deadline"],
      house: {}
    };
  },

  async created() {
    if ("houseId" in this.$route.params) {
      this.getHouse(this.$route.params.houseId);
    }
  },

  methods: {
    async getHouse(_id) {
      this.house = await api.get("houses", _id);
    }
  }
};
</script>
