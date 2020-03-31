<template>
  <div>
    <b-card class="mx-3 my-3">
      <b-container>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-row>
            <b-col>
              <b-form-group
                id="companyName"
                label="Company Name:"
                label-for="companyName"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.companyName"
                  type="text"
                  required
                  placeholder="Google"
                ></b-form-input> </b-form-group
            ></b-col>
            <b-col>
              <b-form-group
                id="jobTitle"
                label="Job Title:"
                label-for="jobTitle"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.jobTitle"
                  required
                  placeholder="Software Engineer"
                ></b-form-input> </b-form-group
            ></b-col>
            <b-col>
              <label for="example-datepicker">Date Applied</label>
              <b-form-datepicker
                id="dateApplied"
                v-model="form.dateApplied"
                class="mb-2"
              ></b-form-datepicker>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="jobUrl"
                label="Job Description Link:"
                label-for="jobUrl"
              >
                <b-form-input
                  id="jobUrl"
                  v-model="form.jobUrl"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="status" label="Status:" label-for="status">
                <b-form-select
                  id="status"
                  v-model="form.status"
                  :options="status"
                  required
                ></b-form-select> </b-form-group
            ></b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-textarea
                id="notes"
                v-model="form.notes"
                placeholder="Notes on the application..."
                rows="3"
                max-rows="10"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center mt-2">
              <b-button type="submit" variant="primary" class="mr-2"
                >Submit</b-button
              >
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Form',
  data() {
    return {
      form: {
        companyName: '',
        jobTitle: '',
        dateApplied: '',
        status: '',
        jobUrl: '',
        notes: ''
      },
      status: [
        { text: 'Select One', value: null },
        'Applied',
        'Interview in progress',
        'Rejected',
        'Offer received'
      ]
    };
  },
  methods: {
    ...mapActions(['addNewJob']),
    onSubmit(evt) {
      evt.preventDefault();
      const job = this.form;
      job.userId = this.$auth.user.sub;
      this.addNewJob(job);
      this.onReset(evt);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.companyName = '';
      this.form.jobTitle = '';
      this.form.dateApplied = '';
      this.form.status = null;
      this.form.jobUrl = '';
      this.form.notes = '';
    }
  }
};
</script>
