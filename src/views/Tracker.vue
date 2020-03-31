<template>
  <div>
    <b-container fluid="true" class="mx-3 my-3">
      <b-table
        striped
        hover
        bordered
        :items="jobsByUser"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
        v-show="showTracker"
      >
        <template v-slot:cell(jobUrl)="row">
          <b-button
            size="sm"
            :href="'//' + row.item.jobUrl"
            target="_blank"
            class="mr-1"
          >
            Go to Job Desc
          </b-button>
        </template>
        <template v-slot:cell(notes)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Show
          </b-button>
          <b-button
            size="sm"
            @click="getNoteForUpdate(row.item)"
            variant="primary"
            class="mr-1"
          >
            Update
          </b-button>
        </template>
        <template v-slot:cell(updateStatus)="row">
          <b-button size="sm" variant="primary" class="mr-1">
            Update status
          </b-button>
        </template>
      </b-table>

      <div class="mx-3">
        Sorting By: <b>{{ sortBy }}</b
        >, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
      <Note
        v-show="showNote"
        @updateNote="updateNote"
        @cancel="cancel"
        ref="note"
      ></Note>
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import * as api from '@/utils/api.js';
import { mapGetters, mapActions } from 'vuex';
import Note from '@/components/Note.vue';
const moment = require('moment');

export default {
  name: 'Tracker',
  components: {
    Note
  },
  computed: mapGetters(['jobsByUser', 'job']),
  data() {
    return {
      sortBy: 'dateApplied',
      sortDesc: false,
      fields: [
        { key: 'companyName', sortable: false },
        { key: 'jobTitle', sortable: false },
        { key: 'jobUrl', sortable: false },
        { key: 'dateApplied', sortable: true },
        { key: 'status', sortable: true },
        { key: 'notes', sortable: false },
        { key: 'updateStatus' }
      ],
      infoModal: {
        id: 'info-modal',
        title: 'Notes',
        content: ''
      },
      showNote: false,
      showTracker: true
    };
  },
  methods: {
    ...mapActions(['getJobsByUser', 'jobDetail']),
    info(item, index, button) {
      this.infoModal.content = item.notes;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.content = '';
    },
    goToUrl(url) {
      window.open(url, '_blank');
    },
    getNoteForUpdate(item) {
      this.jobDetail(item);
      this.$refs.note.setNote();
      this.showNote = true;
      this.showTracker = false;
    },
    updateNote(id, update) {
      const updatedNote = update;
      const jobId = id;
      console.log('testing', jobId, updatedNote);
    },
    cancel() {
      this.showNote = false;
      this.showTracker = true;
    }
  },
  created() {
    const userId = this.$auth.user.sub;
    this.getJobsByUser(userId);
  }
};
</script>
