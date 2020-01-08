<template>
    <div>
        <h1>Bookings</h1>
        <router-link tag="b-button" :to="{ name: 'createBooking' }">Add a booking</router-link>
        <b-table striped :items="bookings" :fields="fields">
            <template v-slot:cell(guestLastName)="row">
                <router-link :to="{ name: 'booking', params: { bookingId: row.item._id } }">{{
                    row.item.guestLastName
                }}</router-link>
            </template>
            <template v-slot:cell(edit)="row">
                <router-link tag="b-button" :to="{ name: 'editBooking', params: { bookingId: row.item._id } }"
                    >Edit</router-link
                >
            </template>
            <template v-slot:cell(delete)="row">
                <b-button @click="confirmDeleteBooking(row.item)">Delete</b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
import api from '@/api';
export default {
    data() {
        return {
            fields: [
                'guestLastName',
                'guestFirstName',
                'checkInDate',
                'checkOutDate',
                { key: 'edit', label: '' },
                { key: 'delete', label: '' }
            ],
            bookings: []
        };
    },
    async created() {
        this.getBookings();
    },
    methods: {
        async getBookings() {
            this.bookings = await api.getAll('bookings');
        },
        async confirmDeleteBooking(booking) {
            if (confirm(`Are you sure you want to delete ${booking._id}?`)) {
                await api.delete('bookings', booking._id);
            }
        }
    }
};
</script>
