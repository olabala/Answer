<template>
  <div id="container">
    <el-row id="header">
      <el-col :span='12' class="text-left">
        <span id="text-logo">答！</span>
      </el-col>
      <el-col :span='12' class="text-right">
        <router-link :to = "{name:'addQues'}"><el-button type="primary" class="ask-btn new-btn">提问</el-button></router-link>
      </el-col>
    </el-row>
    <el-row id="main">
      <el-row id="main-nav">
        <el-col v-for ='(tab, index) in tabs' :span='12' :key="index" :class="{activeTab:index == indexs}" @click.native="tabChange(index)" >
          <span class="index-tab">{{tab.text}}</span>
        </el-col>
      </el-row>
      <el-row id="main-wrapper">
        <el-row class="ques-box" v-for ="(ques, index) in questionsList" :key='index'>
          <el-row class="ques-title">
            <router-link :to="{name : 'quesDetail', params:{id:ques.id}}" class="ques-title_text">{{ques.title}}</router-link>
          </el-row>
          <el-row class="ques-content">
            <span>{{ques.content}}</span>
            <a class="show-all">显示全部</a>
          </el-row>
          <el-row class="ques-about">
            <el-col :span="16" class="text-left">
              <span class="ques-author"> {{ques.author}} </span>
              <span class="ques-time"> {{ques.time}} </span>
            </el-col>
            <el-col :span="8" class="text-right">
              <span>3个回答</span>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <el-row id="add-more">
        <a class="add-more_text">加载更多...</a>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      indexs: 0,
      tabs: [
        {text: '首页'},
        {text: '我的问题'}
      ]
    }
  },
  mounted () {
    this.getQuestionslist()
  },
  methods: {
    ...mapActions([
      'getQuestionslist'
    ]),
    tabChange (index) {
      this.indexs = index
    }
  },
  computed: {
    ...mapGetters([
      'questionsList'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
