<template>
    <div>
        <router-link :to="{ name: 'bookingsList' }">View all bookings</router-link>

        <form class="form" @submit.prevent="saveBoooking">
            <label for="first-name" class="label">Guest First Name:</label>
            <p class="control">
                <input type="text" class="input" name="first-name" v-model="booking.guestFirstName" />
            </p>
            <label for="last-name" class="label">Guest Last Name:</label>
            <p class="control">
                <input type="text" class="input" name="last-name" v-model="booking.guestLastName" />
            </p>
            <label for="house-id" class="label">House ID:</label>
            <p class="control">
                <input type="text" class="input" name="house-id" v-model="booking.houseId" />
            </p>
            <label for="check-in" class="label">Check-in:</label>
            <p class="control">
                <input type="text" class="input" name="check-in" v-model="booking.checkInDate" />
            </p>
            <label for="check-out" class="label">Check-out:</label>
            <p class="control">
                <input type="text" class="input" name="check-out" v-model="booking.checkOutDate" />
            </p>

            <div class="control is-grouped">
                <p class="control">
                    <button class="button is-primary">Submit</button>
                </p>
                <p class="control">
                    <router-link :to="{ name: 'bookingsList' }"
                        ><button class="button is-link">Cancel</button></router-link
                    >
                </p>
            </div>
        </form>
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
        saveBooking() {
            api.create('bookings', this.booking).then(() => {
                this.$router.push({ name: 'bookingsList' });
            });
        }
    }
};
</script>
