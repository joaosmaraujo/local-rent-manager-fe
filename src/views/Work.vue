<template>
  <div>
    <h1>{{ work.name }}</h1>
    <p>{{ work.frequency }}</p>
    <p>{{ work.advance }}</p>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      work: {}
    };
  },

  async created() {
    if ("workId" in this.$route.params) {
      this.getWork(this.$route.params.workId);
    }
  },

  methods: {
    async getWork(_id) {
      this.work = await api.get("works", _id);
    }
  }
};
</script>
