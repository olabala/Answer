import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const state = {
  questionsList: [],
  comments: [],
  ques: {},
  comment: {}
}

const getters = {
  questionsList: state => state.questionsList,
  ques: state => state.ques,
  comments: state => state.comments
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
