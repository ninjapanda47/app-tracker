<template>
  <b-card class="mx-3 my-3">
    <b-container>
      <b-form @submit="onSubmit" @reset="onReset">
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Note',
  computed: mapGetters(['job']),
  data() {
    return {
      form: {
        notes: ''
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$emit('updateNote', this.job._id, this.form.notes);
      this.onReset(evt);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.notes = '';
      this.$emit('cancel');
    },
    setNote() {
      this.form.notes = this.job.notes;
    }
  }
};
</script>
