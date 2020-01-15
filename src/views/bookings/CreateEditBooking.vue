<template>
    <div>
        <router-link :to="{ name: 'bookingsList' }">View all bookings</router-link>
        <b-form>
            <b-input-group inline>
                <label for="guest-first-name" class="label">Guest First Name:</label>
                <b-input id="guest-first-name" v-model="booking.guestFirstName"></b-input>
            </b-input-group>
            <b-input-group inline>
                <label for="guest-last-name" class="label">Guest Last Name:</label>
                <b-input id="guest-last-name" v-model="booking.guestLastName"></b-input>
            </b-input-group>
            <b-input-group>
                <b-form-select v-model="booking.house" :options="houses"></b-form-select>
            </b-input-group>
            <b-input-group inline>
                <label for="check-in">Check-in: </label>
                <b-input type="date" id="check-in" v-model="booking.checkInDate"></b-input>
            </b-input-group>
            <b-input-group inline>
                <label for="check-out">Check-out: </label>
                <b-input type="date" id="check-out" v-model="booking.checkOutDate"></b-input>
            </b-input-group>
            <b-input-group>
                <b-button @click.prevent="saveBooking">Submit</b-button>
                <router-link :to="{ name: 'bookingsList' }" tag="b-button">Cancel</router-link>
            </b-input-group>
        </b-form>
    </div>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            booking: {},
            houses: []
        };
    },

    async created() {
        if ('bookingId' in this.$route.params) {
            this.getBooking(this.$route.params.bookingId);
        }
        this.getHouses();
    },

    methods: {
        saveBooking() {
            if ('bookingId' in this.$route.params) {
                api.update('bookings', this.booking._id, this.booking).then(() => {
                    this.$router.push({ name: 'bookingsList' });
                });
            } else {
                api.create('bookings', this.booking).then(() => {
                    this.$router.push({ name: 'bookingsList' });
                });
            }
            
        },
        async getBooking(_id) {
            this.booking = await api.get('bookings', _id);
        },
        async getHouses() {
            this.houses = await api.getAll('houses').then(houses => {
                return houses.map(house => {
                    return {
                        value: house,
                        text: `${house.label} - ${house.city}`
                    };
                });
            });
        }
    }
};
</script>
