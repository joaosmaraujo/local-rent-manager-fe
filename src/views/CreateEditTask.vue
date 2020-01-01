<template>
  <div>
    <router-link :to="{ name: 'tasksList' }"
      >View all tasks</router-link
    >
    <b-form @submit.prevent="saveTask">
      <b-input-group inline>
        <b-form-select
          v-model="selectedHouse"
          :options="houses"
        ></b-form-select>
      </b-input-group>
      <b-input-group inline>
        <b-form-select v-model="selectedWork" :options="works"></b-form-select>
      </b-input-group>
      <b-input-group inline>
        <label for="task-cost">Cost: </label>
        <b-input id="task-cost" v-model="task.cost"></b-input>
      </b-input-group>
      <b-input-group inline>
        <label for="task-deadline">Deadline: </label>
        <b-input id="task-deadline" v-model="task.deadline"></b-input>
      </b-input-group>
      <b-input-group>
        <b-button>Submit</b-button>
        <router-link :to="{ name: 'tasksList' }" tag="b-button"
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
      selectedWork: {},
      works: [],
      houses: [],
      task: {}
    };
  },

  async created() {
    if ("taskId" in this.$route.params) {
      this.getTask(this.$route.params.taskId);
    }
    this.getWorks();
    this.getHouses();
  },

  methods: {
    saveTask() {
      api.create("tasks", this.task).then(() => {
        this.$router.push({ name: "tasksList" });
      });
    },
    async Works() {
      this.works = await api.getAll("works").then(works => {
        return works.map(work => {
          return {
            value: work,
            text: work.name
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
