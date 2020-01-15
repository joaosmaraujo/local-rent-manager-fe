<template>
    <div>
        <h1>{{ task.house.label }} - {{ task.work.name }}</h1>
        <p>House: {{ task.house.label }}</p>
        <p>Work: {{ task.work.name }}</p>
        <p>Cost: {{ task.cost }}</p>
        <p>To be done at: {{ task.deadline }}</p>
        <p>Completed: {{ task.completed }}</p>
    </div>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            task: {}
        };
    },

    async created() {
        if ('taskId' in this.$route.params) {
            this.getTask(this.$route.params.taskId);
        }
    },

    methods: {
        async getTask(_id) {
            this.task = await api.get('tasks', _id);
        }
    }
};
</script>
