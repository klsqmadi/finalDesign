<template>
  <div>
    <div class="header">
      <div class="title">主页</div>
      <div class="btn">
        <i class="el-icon-search" style="margin:0 10px" @click="$router.push('/searchCircle')"></i>
        <i class="el-icon-circle-plus-outline" @click="$router.push('/createCircle')"></i>
      </div>
    </div>
    <div>
      <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in circle" :key="index">
        <div @click="goToDetail(item.id,item.name)">
          <el-row type="flex" style="height:70px;padding:0 20px" align="middle">
            <el-col :span="6" class="image">
              <el-image
                style="width: 50px; height: 50px;border-radius:100%"
                fit="cover"
                src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=559253646,2303530842&fm=26&gp=0.jpg"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-col>
            <el-col>
              <span style="color:#303133">{{item.name}}</span>
            </el-col>
          </el-row>
        </div></el-card
      >
    </div>
  </div>
</template>

<script>
import {getCircleListReq} from '../network/index'
export default {
  data(){
    return{
      circle:[]
    }
  },
  methods: {
    goToDetail(id,circleName) {
      this.$router.push({
        path:'/circle',
        query:{
          id,
          circleName
        }
      });
    },
    getCircleListReq(){
      getCircleListReq(this.$store.state.user.stuNumber).then(({code,data})=>{
        console.log(this.$code == code,'----------------')
        if(code == this.$code){
          this.circle = data
          console.log(this.circle)
          console.log(data)
        }
      })
    }
  },
  created(){
  },
  mounted(){
    this.getCircleListReq()

  }
  
};
</script>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 5vh;
  background: #ffffff;
  margin-bottom: 20px;
  .title {
    font-size: 20px;
    font-weight: 500;
  }
  .btn {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.image {
  display: flex;
  align-items: center;
}
</style>
