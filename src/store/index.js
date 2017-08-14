import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const state = {
  questionsList: [],
  comments: [],
  ques: {},
  comment: {},
  showMoreAnswer: true,
  showMoreQues: true,
  commentsCount: 0,
  commentStart: 0,
  quesStart: 0,
  limit: 4
}

const getters = {
  questionsList: state => state.questionsList,
  ques: state => state.ques,
  comments: state => state.comments,
  commentsCount: state => state.commentsCount,
  showMoreAnswer: state => state.showMoreAnswer,
  showMoreQues: state => state.showMoreQues
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
