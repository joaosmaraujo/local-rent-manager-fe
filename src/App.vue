<template>
  <div id="app">
    <b-container id="nav">
      <b-row>
        <b-col cols="3">
          <b-nav vertical>
          <b-nav-item active>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/customers">Customers List</router-link>
          </b-nav-item>
          <b-nav-item>Another Link</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav></b-col>
        <b-col cols="9"><router-view/></b-col>
      </b-row>
    </b-container>
  </div>
</template>
