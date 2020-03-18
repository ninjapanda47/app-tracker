<template>
  <div v-if="$auth.isAuthenticated">
    <b-container fluid="true" class="mx-3 my-3">
      <b-table
        striped
        hover
        bordered
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
      >
        <template v-slot:cell(updateStatus)="row">
          <b-button size="sm" class="mr-1">
            Update status
          </b-button>
        </template>
      </b-table>

      <div class="mx-3">
        Sorting By: <b>{{ sortBy }}</b
        >, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
    </b-container>
  </div>
</template>
<script>
import * as api from '@/utils/api.js';

export default {
  name: 'Tracker',
  data() {
    return {
      sortBy: 'dateApplied',
      sortDesc: false,
      fields: [
        { key: 'companyName', sortable: false },
        { key: 'jobTitle', sortable: false },
        { key: 'dateApplied', sortable: true },
        { key: 'status', sortable: false },
        { key: 'notes', sortable: false },
        { key: 'updateStatus' }
      ],
      items: [
        {
          companyName: 'Facebook',
          jobTitle: 'Software Engineer',
          dateApplied: '3/4/2020',
          status: 'Applied',
          notes: ''
        },
        {
          companyName: 'Google',
          jobTitle: 'Frontend Developer',
          dateApplied: '3/6/2020',
          status: 'Applied',
          notes: 'test'
        }
      ]
    };
  },
  methods: {
    async getApplicationsByUser(id) {
      console.log(id);
      let results = await api.getApplicationsbyUser(id);
      console.log(results);
    }
  },
  mounted: function() {
    console.log(this.$auth.user.sub);
  }
};
</script>
