<template>
    <div>
        <h1>Works</h1>
        <router-link tag="b-button" :to="{ name: 'createWork' }">Add a work</router-link>
        <b-table striped :items="works" :fields="fields">
            <template v-slot:cell(name)="row">
                <router-link :to="{ name: 'work', params: { workId: row.item._id } }">{{ row.item.name }}</router-link>
            </template>
            <template v-slot:cell(edit)="row">
                <router-link tag="b-button" :to="{ name: 'editWork', params: { workId: row.item._id } }"
                    >Edit</router-link
                >
            </template>
            <template v-slot:cell(delete)="row">
                <b-button @click="confirmDeleteWork(row.item)">Delete</b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
import api from '@/api';
export default {
    data() {
        return {
            fields: ['name', 'frequency', 'advance', { key: 'edit', label: '' }, { key: 'delete', label: '' }],
            works: []
        };
    },
    async created() {
        this.getWorks();
    },
    methods: {
        async getWorks() {
            this.works = await api.getAll('works');
        },
        async confirmDeleteWork(work) {
            if (confirm(`Are you sure you want to delete ${work._id}?`)) {
                await api.delete('works', work._id).then(() => {
                    this.getWorks();
                });
            }
        }
    }
};
</script>
