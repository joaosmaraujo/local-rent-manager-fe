<template>
  <div>
    <h1>{{ taskRegistry.house.label }} - {{ taskRegistry.work.name }}</h1>
    <p>House: {{ taskRegistry.house.label }}</p>
    <p>Work: {{ taskRegistry.work.name }}</p>
    <p>Cost: {{ taskRegistry.cost }}</p>
    <p>To be done at: {{ taskRegistry.deadline }}</p>
    <p>Completed: {{ taskRegistry.completed }}</p>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      taskRegistry: {}
    };
  },

  async created() {
    if ("taskRegistryId" in this.$route.params) {
      this.getTaskRegistry(this.$route.params.taskRegistryId);
    }
  },

  methods: {
    async getTaskRegistry(_id) {
      this.taskRegistry = await api.get("tasksRegistries", _id);
    }
  }
};
</script>
