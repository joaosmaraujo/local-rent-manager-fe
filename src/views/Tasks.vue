<template>
  <div>
    <h1>Tasks</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Frequency</th>
          <th>Anticipation</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          v-bind:key="task._id"
          @click="selectTask(task)"
        >
          <td>{{ task._id }}</td>
          <td>{{ task.name }}</td>
          <td>{{ task.frequency }}</td>
          <td>{{ task.anticipation }}</td>
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
      tasks: []
    };
  },
  async created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      this.tasks = await api.getTasks();
    }
  }
};
</script>
