<template>
    <div>
        <h1>Tasks</h1>
        <router-link :to="{ name: 'createTask' }">Add a task</router-link>
        <b-table striped :items="tasks" :fields="fields">
            <template v-slot:cell(_id)="row">
                <router-link :to="{ name: 'task', params: { taskId: row.item._id } }">{{
                    row.item._id
                }}</router-link>
            </template>
            <template v-slot:cell(edit)="row">
                <router-link tag="b-button" :to="{ name: 'editTask', params: { taskId: row.item._id } }"
                    >Edit</router-link
                >
            </template>
            <template v-slot:cell(delete)="row">
                <b-button @click="confirmDeleteTask(row.item)">Delete</b-button>
            </template>
        </b-table>
    </div>
</template>
<script>
import api from '@/api';
export default {
    data() {
        return {
            fields: ['_id' , { key: 'house.label', label: 'House' }, { key: 'work.name', label: 'Work' }, 'cost', 'deadline', 'completed', { key: 'edit', label: '' }, { key: 'delete', label: '' }],
            tasks: []
        };
    },
    async created() {
        this.getTasks();
    },
    methods: {
        async getTasks() {
            this.tasks = await api.getAll('tasks');
        },
        async confirmDeleteTask(task) {
            if (confirm(`Are you sure you want to delete ${task._id}?`)) {
                await api.delete('tasks', task._id).then(() => {
                    this.getTasks();
                });
            }
        }
    }
};
</script>
