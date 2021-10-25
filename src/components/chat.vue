<template>
  <div class="flex flex-col" style="height:100vh">
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>{{nick}}</div>
    </div>
    <div class="flex-grow bg-gray-300 pt-6 px-3 flex flex-col" style="overflow-y:auto">
      <div v-for="item in content" :key="item.crid" class="mb-6">
        <div class="flex justify-end" v-if="fromId == item.fromId">
          <div class=" p-2 px-3 bg-white rounded-md break-words" style="max-width: 60vw">{{item.content}}</div>
          <el-avatar class="ml-4"></el-avatar>
        </div>
        <div class="flex" v-else>
          <el-avatar class="mr-4"></el-avatar>
          <div class=" p-2 px-3 bg-white rounded-md break-words" style="max-width: 60vw">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 flex p-2">
      <el-input placeholder="请输入" class="mr-4" v-model="message"></el-input>
      <el-button type="success" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
import { getChat, sendChat, getNewChat } from '../network/index'

export default {
  name: "chat",
  data() {
    return {
      nick: '聊天',
      fromId: 0,
      toId: 1,
      content: [
      ],
      message: '',
      timeout: null
    };
  },
  created() {
    let { fromId, toId, nick } = this.$route.query
    this.fromId = fromId
    this.toId = toId
    this.nick = nick
    this.getHistoryChat()
  },
  mounted() {
    this.timeout = setInterval(() => {
      this.lunxun()
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.timeout)
  },
  methods: {
    lunxun() {
      console.log(1)
      let { fromId, toId } = this
      getNewChat({ fromId, toId }).then(({ code, message, data }) => {
        if(data.length != 0) {
          this.content = [...this.content, ...data]
        }
      }).catch((err) => {
        this.$message(err)
      })
    },
    sendMessage() {
      let { message, fromId, toId } = this
      sendChat({ content: message, fromId, toId }).then(({ code, message, data }) => {
        if(code == this.$code) {
          this.content.push(data)
          this.message = ''
        } else {
          throw message
        }
      }).catch((err) => {
        this.$message(err)
      })
    },
    getHistoryChat() {
      let { fromId, toId } = this
      getChat({fromId, toId}).then(({ code, message, data }) => {
        if(code == this.$code) {
          this.content = data
        } else {
          throw message
        }
      }).catch((err) => {
        this.$message(err)
      })
    }
  }
};
</script>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 6vh;
  background: #ffffff;
  margin-bottom: 0vh;
  .back {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
