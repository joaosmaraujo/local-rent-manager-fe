<template>
    <div>
        <h1>Tasks</h1>
        <router-link :to="{ name: 'createTask' }">Add a task</router-link>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>House ID</th>
                    <th>Task ID</th>
                    <th>Cost</th>
                    <th>To Be Done At</th>
                    <th>Completed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" v-bind:key="task._id" @click="selectTask(task)">
                    <td>{{ task._id }}</td>
                    <td>{{ task.houseId }}</td>
                    <td>{{ task.workId }}</td>
                    <td>{{ task.cost }}</td>
                    <td>{{ task.deadline }}</td>
                    <td>{{ task.completed }}</td>
                    <td>
                        <a @click="confirmDeleteTask(task)">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import api from '@/api';
export default {
    data() {
        return {
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
                await api.delete('tasks', task._id);
            }
        }
    }
};
</script>
