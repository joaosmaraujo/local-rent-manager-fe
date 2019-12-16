<template>
  <div>
    <h1>Task Registries</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>House ID</th>
          <th>Task ID</th>
          <th>Cost</th>
          <th>To Be Done At</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="taskRegistry in taskRegistries"
          v-bind:key="taskRegistry._id"
          @click="selectTaskRegistry(taskRegistry)"
        >
          <td>{{ taskRegistry._id }}</td>
          <td>{{ taskRegistry.houseId }}</td>
          <td>{{ taskRegistry.taskId }}</td>
          <td>{{ taskRegistry.cost }}</td>
          <td>{{ taskRegistry.toBeDoneAt }}</td>
          <td>{{ taskRegistry.completed }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      taskRegistries: []
    };
  },
  async created() {
    this.getTaskRegistries();
  },
  methods: {
    async getTaskRegistries() {
      this.taskRegistries = await api.getTaskRegistries();
    }
  }
};
</script>
