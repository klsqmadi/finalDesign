<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)"><i class="el-icon-back" style="font-size:20px"></i></div>
      <div>{{circleName}}</div>
      <div class="add" @click="goToTask()"><i class="el-icon-plus" style="color:#409EFF"></i></div>
    </div>
    <el-row style="padding:10px" type="flex">
      <el-col :span="8">
          <el-image style="width:80px;height:80px;border-radius:100%" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=559253646,2303530842&fm=26&gp=0.jpg"></el-image>
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
