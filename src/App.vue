<template>
  <div id="app">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import * as api from "@/utils/api.js";

export default {
  name: "App",
  components: {
    Nav
  },
  methods: {}
};
</script>