<template>
  <div>
    <h1>Bookings</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>House ID</th>
          <th>Check-in Date</th>
          <th>Check-out Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="booking in bookings"
          v-bind:key="booking._id"
          @click="selectBooking(booking)"
        >
          <td>{{ booking._id }}</td>
          <td>{{ booking.guestFirstName }}</td>
          <td>{{ booking.guestLastName }}</td>
          <td>{{ booking.houseId }}</td>
          <td>{{ booking.checkInDate }}</td>
          <td>{{ booking.checkOutDate }}</td>
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
      bookings: []
    };
  },
  async created() {
    this.getBookings();
  },
  methods: {
    async getBookings() {
      this.bookings = await api.getBookings();
    }
  }
};
</script>
