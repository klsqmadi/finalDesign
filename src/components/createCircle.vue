<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>新建圈子</div>
    </div>
    <el-row>
      <el-col style="text-align:center"
        ><span>请填写您要创建的圈子信息</span></el-col
      >
    </el-row>
    <el-form :model="form" ref="form" style="padding:20px">
      <el-form-item label="圈名">
        <el-input v-model="form.name" placeholder="填写信息"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col style="display:flex;justify-content:center"
        ><el-button type="success" style="width:90vw" @click="confirm()"
          >确定创建</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
import {createCircle} from '../network/index'
export default {
    data(){
        return {
            form:{}
        }
    },
    methods:{
        confirm(){
            const stuNumber = this.$store.state.user.stuNumber
            createCircle(this.form.name,stuNumber).then(res=>{
                if(res){
                    this.$router.back(-1)
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
