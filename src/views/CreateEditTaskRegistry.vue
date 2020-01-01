<template>
  <div>
    <router-link :to="{ name: 'tasksRegistriesList' }"
      >View all tasks registries</router-link
    >
    <b-form @submit.prevent="saveTaskRegistry">
      <b-input-group inline>
        <b-form-select
          v-model="selectedHouse"
          :options="houses"
        ></b-form-select>
      </b-input-group>
      <b-input-group inline>
        <b-form-select v-model="selectedTask" :options="tasks"></b-form-select>
      </b-input-group>
      <b-input-group inline>
        <label for="task-cost">Cost: </label>
        <b-input id="task-cost" v-model="taskRegistry.cost"></b-input>
      </b-input-group>
      <b-input-group inline>
        <label for="task-deadline">To Be Done At: </label>
        <b-input id="task-deadline" v-model="taskRegistry.deadline"></b-input>
      </b-input-group>
      <b-input-group>
        <b-button>Submit</b-button>
        <router-link :to="{ name: 'tasksRegistriesList' }" tag="b-button"
          >Cancel</router-link
        >
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      selectedHouse: {},
      selectedTask: {},
      tasks: [],
      houses: [],
      taskRegistry: {}
    };
  },

  async created() {
    if ("taskRegistryId" in this.$route.params) {
      this.getTaskRegistry(this.$route.params.taskRegistryId);
    }
    this.getTasks();
    this.getHouses();
  },

  methods: {
    saveTaskRegistry() {
      api.create("tasksRegistries", this.taskRegistry).then(() => {
        this.$router.push({ name: "tasksRegistriesList" });
      });
    },
    async getTasks() {
      this.tasks = await api.getAll("tasks").then(tasks => {
        return tasks.map(task => {
          return {
            value: task,
            text: task.name
          };
        });
      });
    },
    async getHouses() {
      this.houses = await api.getAll("houses").then(houses => {
        return houses.map(house => {
          return {
            value: house,
            text: house.address
          };
        });
      });
    }
  }
};
</script>
