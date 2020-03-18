<template>
  <div class="home">
    <Tracker></Tracker>
  </div>
</template>

<script>
import Tracker from "@/components/Tracker.vue";
export default {
  name: "home",
  components: {
    Tracker
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>