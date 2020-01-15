<template>
    <div>
        <h1>Booking - {{ booking.checkInDate }} - {{ booking.checkOutDate }}</h1>
        <p>Guest Name: {{ booking.guestLastName }}, {{ booking.guestFirstName }}</p>
        <p>House: {{ booking.house.label }}</p>
        <p>Check-in: {{ booking.checkInDate }}</p>
        <p>Check-out: {{ booking.checkOutDate }}</p>
    </div>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            booking: {}
        };
    },

    async created() {
        if ('bookingId' in this.$route.params) {
            this.getBooking(this.$route.params.bookingId);
        }
    },

    methods: {
        async getBooking(_id) {
            this.booking = await api.get('bookings', _id);
        }
    }
};
</script>
