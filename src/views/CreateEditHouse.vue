<template>
  <div>
    <router-link :to="{ name: 'housesList' }">View all houses</router-link>
    <b-form @submit.prevent="saveHouse">
      <b-input-group inline>
        <label for="house-label">Label: </label>
        <b-input id="house-label" v-model="house.label"></b-input>
      </b-input-group>
      <b-input-group inline>
        <label for="house-type">Type: </label>
        <b-input id="house-type" v-model="house.type"></b-input>
      </b-input-group>
      <b-input-group inline>
        <label for="house-address">Address: </label>
        <b-input id="house-address" v-model="house.address"></b-input>
      </b-input-group>
      <b-input-group>
        <b-form-select
          v-model="selectedOwner"
          :options="owners"
        ></b-form-select>
      </b-input-group>
      <b-input-group>
        <b-button>Submit</b-button>
        <router-link :to="{ name: 'housesList' }" tag="b-button"
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
      house: {},
      selectedOwner: {},
      owners: []
    };
  },

  async created() {
    if ("houseId" in this.$route.params) {
      this.getHouse(this.$route.params.houseId);
    }
    this.getOwners();
  },

  methods: {
    saveHouse() {
      api.create("houses", this.house).then(() => {
        this.$router.push({ name: "housesList" });
      });
    },
    async getHouse(_id) {
      this.house = await api.get("houses", _id);
    },
    async getOwners() {
      this.owners = await api.getAll("customers").then(customers => {
        return customers.map(customer => {
          return {
            value: customer,
            text: `${customer.firstName} ${customer.lastName}`
          };
        });
      });
    }
  }
};
</script>
