import * as api from '@/utils/api.js';
import moment from 'moment';

const state = {
  jobs: [],
  job: {},
  stats: {}
};

const getters = {
  jobsByUser: state => state.jobs,
  job: state => state.job,
  stats: state => state.stats
};

const actions = {
  async getJobsByUser({ commit }, userId) {
    let results = await api.getAppsByUser(userId);
    results.forEach(element => {
      element.dateApplied = moment(element.dateApplied).format('MM-DD-YYYY');
    });
    commit('setJobs', results);
  },
  async getStatsByUser({ commit }, userId) {
    let result = await api.getStatsByUser(userId);
    commit('setStats', result);
  },
  async addNewJob({ commit }, job) {
    let response = await api.addApp(job);
    commit('newJob', response);
  },
  async jobDetail({ commit }, job) {
    commit('jobDetail', job);
  },
  async updateJob({ commit }, update) {
    let response = await api.updateApp(update);
    commit('updateJob', response);
  },
  async deleteJob({ commit }, update) {
    await api.deleteApp(update);
    commit('deleteJob', update);
  }
};

const mutations = {
  setJobs: (state, jobs) => (state.jobs = jobs),
  setStats: (state, stats) => (state.stats = stats),
  newJob: (state, job) => state.jobs.push(job),
  jobDetail: (state, job) => (state.job = job),
  updateJob: (state, updatedJob) => {
    updatedJob.dateApplied = moment(updatedJob.dateApplied).format(
      'MM-DD-YYYY'
    );
    state.jobs = state.jobs.map(job => {
      if (job._id === updatedJob._id) {
        job = updatedJob;
      }
      return job;
    });
  },
  deleteJob: (state, update) =>
    (state.jobs = state.jobs.filter(job => job._id !== update.id))
};

export default {
  state,
  getters,
  actions,
  mutations
};
