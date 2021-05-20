<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>发布任务</div>
    </div>
    <div>
        <el-row>
            <el-col style="text-align:center"><span>请填写您要发布的任务信息</span></el-col>
        </el-row>
        <el-form :model="form" ref="form" style="padding:20px">
            <el-form-item label="标题">
                <el-input v-model="form.title" placeholder="填写信息"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
                <el-input v-model="form.time" placeholder="请填写截止时间"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.phone" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="具体信息">
                <el-input type="textarea" v-model="form.details"></el-input>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col style="display:flex;justify-content:center"><el-button type="success" style="width:90vw" @click="confirm()">发布信息</el-button></el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import {putAddTask} from '../network/index'
export default {
    data(){
        return {
            form:{
                title:'',
                address:'',
                time:'',
                details:'',
                phone:''
            }
        }
    },
    created(){
        const {id} = this.$route.query
        this.circleId = id
        this.stuNumber = this.$store.state.user.stuNumber
        console.log(this.stuNumber)
    },
    methods:{
        confirm(){
            const content = `${this.form.address}-${this.form.address}-${this.form.phone}-${this.form.details}`
            putAddTask(this.circleId,content,this.form.title,this.stuNumber).then((res)=>{
                if(res == this.$code){
                    this.$router.go(-1)
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
