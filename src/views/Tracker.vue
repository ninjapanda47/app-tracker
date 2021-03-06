<template>
  <div>
    <b-container fluid="true" class="mx-3 my-3">
      <StatBar></StatBar>
      <b-table
        hover
        bordered
        :tbody-tr-class="rowClass"
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
            Job Desc
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
          <b-form-select
            @change="onSelect(row.item._id)"
            :options="options"
            class="w-75"
            size="sm"
          ></b-form-select>
          <b-icon
            icon="x-square-fill"
            style="width: 40px; height: 40px;"
            class="align-middle ml-1 my-0"
            variant="danger"
            v-b-tooltip.hover
            title="Delete job"
            @click="deleteApp(row.item._id)"
          ></b-icon>
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
import StatBar from '@/components/StatBar.vue';

export default {
  name: 'Tracker',
  components: {
    Note,
    StatBar
  },
  computed: mapGetters(['jobsByUser', 'job']),
  data() {
    return {
      sortBy: '',
      sortDesc: false,
      fields: [
        { key: 'companyName', thStyle: { width: '12em' }, sortable: false },
        { key: 'jobTitle', thStyle: { width: '15em' }, sortable: false },
        { key: 'jobUrl', sortable: false },
        { key: 'dateApplied', sortable: true },
        { key: 'status', thStyle: { width: '10em' }, sortable: true },
        { key: 'notes', thStyle: { width: '10em' }, sortable: false },
        { key: 'updateStatus' }
      ],
      app: [],
      options: [
        'Applied',
        'Interview in progress',
        'Rejected',
        'Offer received'
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
    ...mapActions([
      'getJobsByUser',
      'getStatsByUser',
      'jobDetail',
      'updateJob',
      'deleteJob'
    ]),
    rowClass(item, type) {
      if (!item || type !== 'row') return;
      if (item.status === 'Rejected') return 'table-danger';
      if (item.status === 'Interview in progress') return 'table-info';
    },
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
    updateNote(id, notes) {
      const update = { notes: notes };
      this.updateJob({ id, update });
    },
    cancel() {
      this.showNote = false;
      this.showTracker = true;
    },
    onSelect(id) {
      const userId = this.$auth.user.sub;
      const update = { status: event.target.value };
      this.updateJob({ id, update });
      this.getStatsByUser(userId);
    },
    deleteApp(id) {
      this.deleteJob({ id });
    }
  },
  created() {
    const userId = this.$auth.user.sub;
    this.getJobsByUser(userId);
    this.getStatsByUser(userId);
  }
};
</script>
