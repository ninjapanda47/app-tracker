import * as api from '@/utils/api.js';
import moment from 'moment';

const state = {
  jobs: [],
  job: {}
};

const getters = {
  jobsByUser: state => state.jobs,
  job: state => state.job
};

const actions = {
  async getJobsByUser({ commit }, userId) {
    let results = await api.getApplicationsbyUser(userId);
    results.forEach(element => {
      element.dateApplied = moment(element.dateApplied).format('MM-DD-YYYY');
    });
    commit('setJobs', results);
  },
  async addNewJob({ commit }, job) {
    let response = await api.addApplication(job);
    commit('newJob', response);
  },
  async jobDetail({ commit }, job) {
    commit('jobDetail', job);
  }
};

const mutations = {
  setJobs: (state, jobs) => (state.jobs = jobs),
  newJob: (state, job) => state.jobs.push(job),
  jobDetail: (state, job) => (state.job = job)
};

export default {
  state,
  getters,
  actions,
  mutations
};
