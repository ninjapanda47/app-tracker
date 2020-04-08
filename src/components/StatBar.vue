<template>
  <div class="mb-3">
    <h5>
      <b-badge class="mr-2">{{ this.stats.submitted }} submitted</b-badge>
      <b-badge class="mr-2" variant="primary"
        >{{ this.stats.interviewed }} interviewed</b-badge
      >
      <b-badge class="mr-2" variant="danger"
        >{{ this.stats.rejected }} rejected</b-badge
      >
    </h5>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Statbar',
  computed: mapGetters(['stats'])
};
</script>
