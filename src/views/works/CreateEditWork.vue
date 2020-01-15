<template>
    <div>
        <router-link :to="{ name: 'worksList' }">View all works</router-link>
        <form class="form" @submit.prevent="saveWork">
            <label for="name" class="label">Name:</label>
            <p class="control">
                <input type="text" class="input" name="name" v-model="work.name" />
            </p>
            <label for="frequency" class="label">Frequency:</label>
            <p class="control">
                <input type="text" class="input" name="frequency" v-model="work.frequency" />
            </p>
            <label for="advance" class="label">Advance:</label>
            <p class="control">
                <input type="text" class="input" name="advance" v-model="work.advance" />
            </p>
            <div class="control is-grouped">
                <p class="control">
                    <button class="button is-primary">Submit</button>
                </p>
                <p class="control">
                    <router-link :to="{ name: 'worksList' }"
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
            work: {}
        };
    },

    async created() {
        if ('workId' in this.$route.params) {
            this.getWork(this.$route.params.workId);
        }
    },

    methods: {
        async getWork(_id) {
            this.work = await api.get('works', _id);
        },
        saveWork() {
            if ('workId' in this.$route.params) {
                api.update('works', this.work._id, this.work).then(() => {
                    this.$router.push({ name: 'worksList' });
                });
            } else {
                api.create('works', this.work).then(() => {
                    this.$router.push({ name: 'worksList' });
                });
            }
        }
    }
};
</script>
