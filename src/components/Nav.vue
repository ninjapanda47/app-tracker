<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">App Tracker</b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="!$auth.loading" class="ml-auto">
        <b-button v-if="!$auth.isAuthenticated" @click="login">Login</b-button>
        <b-navbar-nav v-if="$auth.isAuthenticated" class="flex-row">
          <b-nav-item-dropdown :text="$auth.user.name" right>
            <b-dropdown-item to="/form">Add new applications</b-dropdown-item>
            <b-dropdown-item to="/tracker">View tracker</b-dropdown-item>
            <b-dropdown-item @click="logout">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
          <img :src="$auth.user.picture" width="40" height="40" class="ml-2" />
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Nav',
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
