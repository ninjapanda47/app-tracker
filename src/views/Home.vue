<template>
  <div class="home">

  </div>
</template>

<script>
// .. imports removed for brevity

export default {
  name: "home",
  components: {},
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