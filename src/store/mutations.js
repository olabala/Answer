import * as types from './mutation-types'

export default {
  [types.ADD_QUES] (state, ques) {
    state.ques = ques
  },
  [types.GET_QUES_AND_COMMENTS] (state, payload) {
    state.ques = payload.ques
    state.comments = payload.comment
    state.showMoreAnswer = true
    state.commentStart = 0
  },
  [types.ADD_COMMENT] (state, comment) {
    state.comment = comment
  },
  [types.GET_COMMENTSLIST] (state, commentsList) {
    state.commentsList = commentsList
  },
  [types.GET_QUESTIONSLIST] (state, questionsList) {
    state.questionsList = questionsList
  },
  [types.COMMENT_COUNT] (state, count) {
    state.commentsCount = count
  },
  [types.LOAD_MORE_ANSWER] (state, {comments, vm}) {
    if (comments.length === 0) {
      vm.$message({
        message: '抱歉，没有更多答案!',
        duration: '1000',
        type: 'error'
      })
    } else {
      comments.map((e) => {
        state.comments.push(e)
      })
    }
    if (comments.length < 4) {
      state.showMoreAnswer = false
    }
  },
  [types.LOAD_MORE_QUESTION] (state, {questions, vm}) {
    if (questions.length === 0) {
      vm.$message({
        message: '抱歉，没有更多问题!',
        duration: '1000',
        type: 'error'
      })
    } else {
      questions.map((e) => {
        state.questionsList.push(e)
      })
    }
    if (questions.length < 4) {
      state.showMoreQues = false
    }
  }
}
