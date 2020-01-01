<template>
  <div>
    <router-link :to="{ name: 'tasksList' }">View all tasks</router-link>

    <form class="form" @submit.prevent="saveTask">
      <label for="name" class="label">Name:</label>
      <p class="control">
        <input type="text" class="input" name="name" v-model="task.name" />
      </p>
      <label for="frequency" class="label">Frequency:</label>
      <p class="control">
        <input
          type="text"
          class="input"
          name="frequency"
          v-model="task.frequency"
        />
      </p>
      <label for="advance" class="label">Advance:</label>
      <p class="control">
        <input
          type="text"
          class="input"
          name="advance"
          v-model="task.advance"
        />
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'tasksList' }"
            ><button class="button is-link">Cancel</button></router-link
          >
        </p>
      </div>
    </form>
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
    saveTask() {
      api.create("tasks", this.task).then(() => {
        this.$router.push({ name: "tasksList" });
      });
    }
  }
};
</script>
