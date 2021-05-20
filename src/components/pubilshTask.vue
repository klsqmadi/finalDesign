<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>已发布任务</div>
    </div>
    <el-row style="padding:6px 14px;border-bottom:6px #00000010 solid" v-for="item in task">
      <el-col :span="24" style="margin-bottom:4px">{{item.title}}</el-col>
      <el-col style="font-size:14px;margin-bottom:6px;color:#00000080;text-indent:2em">{{item.content}}</el-col>
      <el-col :span="24"><el-button size="mini" style="float:right" class="clearfix" plain :type="flagStatus(item.status)">{{item.status == 2?'已完成':'待接收'}}</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import {getTaskByPost} from '../network/index'
export default {
  data(){
    return {
      task:[]
    }
  },
  created(){
    this.getTask()
  },
  methods:{
    flagStatus(status) {
      return status == 2 ? "info" : "success";
    },
    getTask(){
      const stuNum = this.$store.state.user.stuNumber
      getTaskByPost(stuNum).then(({code,data,msg})=>{
        if(code == this.$code){
          this.task = data
          console.log(this.task)
        }
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
  height: 5vh;
  background: #ffffff;
  margin-bottom: 20px;
  .back {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
