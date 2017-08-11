<template>
  <div id="container">
    <el-row id="header">
      <el-col :span='6' class="text-left">
        <router-link :to="{name:'home'}"  class="icon-back back-area"></router-link>
      </el-col>
      <el-col :span='12' class="text-center">
        <span class="header-title">发布问题</span>
      </el-col>
      <el-col :span='6' class="text-right" id="answer-btn_bar">
        <el-button type="primary" class="submit-btn new-btn submit-area" @click = openModal()>提交</el-button>
      </el-col>
    </el-row>
    <el-row id="main">
      <el-row id="main-wrapper">
        <form id="ques-form">
          <el-row>
            <label for="ques-title">标题：（50字以内的中文、英文或数字）</label>
            <p class="form-alert">问题标题不能为空！</p>
            <input id="ques-title" type="text" placeholder="请输入问题标题" />
          </el-row>
          <el-row class="ques-textarea">
            <label for="ques-content">描述：（200字以内）</label>
            <p class="form-alert">问题描述不能为空！</p>
            <textarea id="ques-content" placeholder="请输入问题描述"></textarea>
          </el-row>
          <el-row class="form-btn">
            <el-button class="submit-btn new-btn" @click = submitAnswer()>提交</el-button>
            <router-link :to="{name:'home'}"><el-button class="cancel-btn" @click = cancel()>取消</el-button></router-link>
          </el-row>
        </form>
     </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    answer () {
      document.getElementById('answer-btn_bar').style.display = 'none'
      document.getElementById('popup-answer').style.display = 'block'
    },
    cancelAnswer () {
      document.getElementById('popup-answer').style.display = 'none'
      document.getElementById('answer-btn_bar').style.display = 'block'
    },
    submitAnswer () {
      alert('成功提交回答！')
      this.cancelAnswer()
    },
    openModal () {
      this.$confirm('是否确认提交问题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交！'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
