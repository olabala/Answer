import * as types from './mutation-types'

export default {
  [types.ADD_QUES] (state, ques) {
    state.ques = ques
  },
  [types.GET_QUES_AND_COMMENTS] (state, payload) {
    state.ques = payload.ques
    state.comments = payload.comment
  },
  [types.ADD_COMMENT] (state, comment) {
    state.comment = comment
  },
  [types.GET_COMMENTSLIST] (state, commentsList) {
    state.commentsList = commentsList
  },
  [types.GET_QUESTIONSLIST] (state, questionsList) {
    state.questionsList = questionsList
  }
}
