<template>
  <div id="container">
    <el-row id="header">
      <el-col :span='6' class="text-left">
        <router-link :to="{name:'home'}"  class="icon-back"></router-link>
      </el-col>
      <el-col :span='12' class="text-center">
        <span class="header-title">问题详情</span>
      </el-col>
      <el-col :span='6' class="text-right" id="answer-btn_bar">
        <el-button type="primary" class="answer-btn new-btn" v-if='showButton' @click = answer()>我来回答</el-button>
      </el-col>
    </el-row>
    <el-row id="main">
      <el-row id="main-wrapper">
        <el-row class="ques-box">
          <el-row class="ques-title">
            <a class="ques-title_text">{{ques.title}}</a>
          </el-row>
          <el-row class="ques-content">
            <span>{{ques.content}}</span>
          </el-row>
          <el-row class="ques-about">
            <el-col :span="16" class="text-left">
              <span class="ques-author">{{ques.author}}</span>
              <span class="ques-time">{{ques.time}}</span>
            </el-col>
            <el-col :span="8" class="text-right">
              <span>{{commentCount}}个回答 </span>
            </el-col>
          </el-row>
        </el-row>
        <el-row id="answer-wrapper">
          <el-row class="answer-box" v-for='(comment, index) in commentsList' :key="index" >
            <el-row class="answer-header">
              <el-col :span="12" class="text-left">
                <span class="ques-author"> {{comment.author}} </span>
                <span class="ques-time"> {{comment.time}} </span>
              </el-col>
              <el-col :span="12" class="text-right">
                <span class="answer-agree" @click="agreeMore(index)">
                  <i class="icon-agree"></i>
                  {{comment.agree}}
                </span>
                <span class="answer-disagree" @click="disagreeMore(index)">
                  <i class="icon-disagree"></i>
                  {{comment.disagree}}
                </span>
             </el-col>
            </el-row>
            <el-row class="answer-content">
              <span class="answer-content_text">
                {{comment.content}}
              </span>
            </el-row>
          </el-row>
        </el-row>
      </el-row>
      <el-row id="add-more">
        <a class="add-more_text">加载更多...</a>
      </el-row>
    </el-row>
    <el-row id="popup-answer" v-if="showAnswer">
      <i class="icon-cancel" @click = cancelAnswer()></i>
      <form id="answer-content">
        <el-row>
          <span>我的回答（200字以内）</span>
        </el-row>
        <el-row class="answer-textarea">

          <p class="form-alert">回答不能为空！</p>
          <textarea placeholder="请输入回答" v-model="answerContent"></textarea>
        </el-row>
        <el-row>
          <el-button class="submit-btn new-btn" @click = submitAnswer()>提交回答</el-button>
        </el-row>
      </form>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'quesDetail',
  data () {
    return {
      id: this.$route.params.id,
      showAnswer: false,
      showButton: true,
      answerContent: ''
    }
  },
  created () {
    this.$store.dispatch('getQuesAndComments', this.id)
  },
  computed: {
    ...mapGetters([
      'ques',
      'comments'
    ]),
    commentsList () {
      let commentList = []
      this.comments.map((e) => {
        commentList.push(Object.assign({}, e))
      })
      for (let i = 0; i < commentList.length; i++) {
        if (commentList[i].agree > 999) {
          commentList[i].agree = '999+'
        }
        if (commentList[i].disagree > 999) {
          commentList[i].disagree = '999+'
        }
      }
      return commentList
    },
    commentCount () {
      return this.comments.length
    }
  },
  methods: {
    answer () {
      this.showAnswer = true
      this.showButton = false
    },
    cancelAnswer () {
      this.showAnswer = false
      this.showButton = true
    },
    submitAnswer () {
      if (this.answerContent === '') {
        this.$message({
          message: '抱歉，请输入您的答案后再提交!',
          duration: '1000',
          type: 'error'
        })
        return
      }
      var time = new Date().getTime()
      const answer = {
        'ques_id': this.id,
        'author': '火火',
        'time': time,
        'content': this.answerContent
      }
      const payload = {}
      payload.comment = answer
      payload.vm = this
      this.$store.dispatch('addComment', payload)
      this.cancelAnswer()
      this.$store.dispatch('getQuesAndComments', this.id)
      this.answerContent = ''
    },
    agreeMore (index) {
      var answer = this.comments[index]
      answer.agree += 1
      this.$store.dispatch('addAgree', answer)
    },
    disagreeMore (index) {
      var answer = this.comments[index]
      answer.disagree += 1
      this.$store.dispatch('addDisagree', answer)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
