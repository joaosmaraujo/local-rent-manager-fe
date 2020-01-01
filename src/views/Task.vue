<template>
  <div>
    <h1>{{ task.name }}</h1>
    <p>{{ task.frequency }}</p>
    <p>{{ task.advance }}</p>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      task: {}
    };
  },

  async created() {
    if ("taskId" in this.$route.params) {
      this.getTask(this.$route.params.taskId);
    }
  },

  methods: {
    async getTask(_id) {
      this.task = await api.get("tasks", _id);
    }
  }
};
</script>
