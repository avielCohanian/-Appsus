import Vue from 'vue';
import Vuex from 'vuex';
import { mailStore } from './mail.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    mailStore,
  },
});
