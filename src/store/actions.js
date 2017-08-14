import * as types from './mutation-types'
import Vue from 'vue'

export default {
  addQues ({ commit }, ques) {
    commit(types.ADD_QUES, ques)
  },
  addComment ({commit}, payload) {
    var answer = Object.assign(payload.comment, { agree: 0, disagree: 0 })
    Vue.http.post('http://localhost:3000/commentsList', answer).then(() => {
      payload.vm.$message({
        message: '恭喜，评论成功!',
        duration: '1000',
        type: 'success'
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getQuestionslist ({ commit, state }, ques) {
    Vue.http.get('http://localhost:3000/questionsList', {
      params: {
        _start: state.quesStart,
        _limit: state.limit
      }
    }).then(function (response) {
      let quesList = response.data
      commit(types.GET_QUESTIONSLIST, quesList)
    }, function (response) {
      console.log(response)
    })
  },
  commentCount ({ commit, state }, id) {
    Vue.http.get('http://localhost:3000/commentsList', {
      params: {
        ques_id: id
      }
    }).then(res => {
      var count = res.data.length
      commit(types.COMMENT_COUNT, count)
    }).catch(err => {
      console.log(err)
    })
  },
  getQuesAndComments ({ commit, state }, id) {
    let payload = {}
    let comments = []
    Vue.http.get('http://localhost:3000/questionsList/' + id, {
    }).then(res => {
      payload.ques = res.data
      return Vue.http.get('http://localhost:3000/commentsList', {
        params: {
          ques_id: id,
          _start: 0,
          _limit: state.limit
        }
      })
    }).then(res => {
      comments = res.data
      payload.comment = comments
    }).then(() => {
      commit(types.GET_QUES_AND_COMMENTS, payload)
    }).catch(err => {
      console.log(err)
    })
  },
  addAgree ({ commit }, answer) {
    Vue.http.put('http://localhost:3000/commentsList/' + answer.id, answer).then(res => {
    }).catch(err => {
      console.log(err)
    })
  },
  addDisagree ({ commit }, answer) {
    Vue.http.put('http://localhost:3000/commentsList/' + answer.id, answer).then(res => {
    }).catch(err => {
      console.log(err)
    })
  },
  loadMoreAnswer ({ commit, state }, payload) {
    state.commentStart += state.limit
    Vue.http.get('http://localhost:3000/commentsList', {
      params: {
        ques_id: payload.quesId,
        _start: state.commentStart,
        _limit: state.limit
      }
    }).then((res) => {
      var comments = res.data
      var vm = payload.vm
      commit(types.LOAD_MORE_ANSWER, {comments, vm})
    }).catch((err) => {
      console.log(err)
    })
  },
  loadMoreQues ({ commit, state }, vm) {
    state.quesStart += state.limit
    Vue.http.get('http://localhost:3000/questionsList', {
      params: {
        _start: state.quesStart,
        _limit: state.limit
      }
    }).then((res) => {
      var questions = res.data
      commit(types.LOAD_MORE_QUESTION, {questions, vm})
    }).catch((err) => {
      console.log(err)
    })
  },
  formatTime ({commit, state}) {
    let wbs = state.wbs
    for (let i = 0; i < wbs.length; i++) {
      if (typeof wbs[i].time === 'number') {
        var time = new Date(wbs[i].time)
        let stamp = new Date().getTime()
        let minutes = Math.floor((stamp - time) / 60000)
        if (minutes <= 60) {
          wbs[i].time = minutes + '分钟前'
        } else if ((minutes > 60) && (minutes <= 1440)) {
          let time1 = time + ''
          wbs[i].time = time1.substring(16, 21)
        } else {
          let time2 = time.getFullYear() + (time.getMonth() + 1) + time.getDate()
          let time3 = time + ''
          let time4 = time3.substring(16, 21)
          wbs[i].time = time2 + ' ' + time4
        }
      }
    }
    commit(types.FORMAT_TIME, wbs)
  }
}
