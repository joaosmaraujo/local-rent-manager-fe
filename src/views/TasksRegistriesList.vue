<template>
  <div>
    <h1>Tasks Registries</h1>
    <router-link :to="{ name: 'createTaskRegistry' }"
      >Add a task registry</router-link
    >
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
        <tr
          v-for="taskRegistry in taskRegistries"
          v-bind:key="taskRegistry._id"
          @click="selectTaskRegistry(taskRegistry)"
        >
          <td>{{ taskRegistry._id }}</td>
          <td>{{ taskRegistry.houseId }}</td>
          <td>{{ taskRegistry.taskId }}</td>
          <td>{{ taskRegistry.cost }}</td>
          <td>{{ taskRegistry.deadline }}</td>
          <td>{{ taskRegistry.completed }}</td>
          <td>
            <a @click="confirmDeleteTaskRegistry(taskRegistry)">Delete</a>
          </td>
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
      this.taskRegistries = await api.getAll("tasks-registries");
    },
    async confirmDeleteTaskRegistry(taskRegistry) {
      if (confirm(`Are you sure you want to delete ${taskRegistry._id}?`)) {
        await api.delete("tasks-registries", taskRegistry._id);
      }
    }
  }
};
</script>
