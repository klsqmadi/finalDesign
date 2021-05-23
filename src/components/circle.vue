<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)"><i class="el-icon-back" style="font-size:20px"></i></div>
      <div>{{circleName}}</div>
      <div class="add" @click="goToTask()"><i class="el-icon-plus" style="color:#409EFF"></i></div>
    </div>
    <el-row style="padding:10px" type="flex">
      <el-col :span="8">
          <el-image style="width:80px;height:80px;border-radius:100%" src="data:image/jpeg;base64,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"></el-image>
      </el-col>
      <el-col style="display:flex;justify-content:space-between;align-items:center">
        <div>{{circleName}}</div>
        <div>
          <el-button size="mini" v-if="!status" @click="joinCircle()" type="primary">加入圈子</el-button>
          <el-button size="mini" v-else type="info">已加入</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding:6px 14px;border-bottom:6px #00000010 solid" v-for="(item,index) in task">
      <el-col :span="24" style="margin-bottom:6px">{{item.title}}</el-col>
      <el-col style="font-size:14px;margin-bottom:6px;color:#00000080;text-indent:2em">{{item.content}}</el-col>
      <el-col :span="24" v-if="status"><el-button size="mini" style="float:right" class="clearfix" @click="accept(item.id,index)" :type="flagStatus(item.status)">{{item.status?'已接受':'接受任务'}}</el-button></el-col>
      <el-col :span="24" v-else><el-button size="mini" style="float:right" class="clearfix" >请先加入圈子</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import {getTaskByCircleReq,acceptTask,joinCircleReq,isJoinCircleReq} from '../network/index'
export default {
  data(){
    return {
      circleName:'',
      id:'',
      task:'',
      status:0
    }
  },
  created(){
    this.stuNumber = this.$store.state.user.stuNumber
    const {id,circleName} = this.$route.query
    this.circleName = circleName
    this.id = id
    this.getTaskByCircle(id)
    this.isJoinCircle()
  },
  methods:{
    joinCircle(){
      joinCircleReq(this.$store.state.user.stuNumber,this.id).then(res=>{
        if(res){
          this.status = 1
        }
      })
    },
    flagStatus(status){
      return status?'info':'success'
    },
    goToTask(){
      this.$router.push({
        path:'/task',
        query:{
          id:this.id
        }
      })
    },
    getTaskByCircle(id){
      getTaskByCircleReq(id).then(({code,data})=>{
        if(code == this.$code
        ){
          this.task = data
        }
      })
    },
    accept(id,index){
      acceptTask(id,this.stuNumber).then(({code,data,msg})=>{
        if(code == this.$code){
          this.task[index].status = 1
        }
      })
    },
    isJoinCircle(){
      isJoinCircleReq(this.$store.state.user.stuNumber,this.id).then(({code,data})=>{
        if(code == this.$code){
          this.status = 1
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
  .add {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
