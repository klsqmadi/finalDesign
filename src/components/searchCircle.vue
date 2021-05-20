<template>
  <div class="search">
    <div slot="prepend" @click="$router.back(-1)"><i class="el-icon-back" style="font-size:20px;margin-right:8px"></i></div>
    <el-input
      placeholder="请输入内容"
      v-model="input"
      class="input-with-select"
      style="height:10px"
    >
      <el-button slot="append" icon="el-icon-search" @click="goToCircle()"></el-button>
    </el-input>
  </div>
</template>

<script>
import {getCircleByName} from '../network/index'
export default {
    data(){
        return {
            input:''
        }
    },
    methods:{
        goToCircle(){
            getCircleByName(this.input).then(({code,data})=>{
                if(code == this.$code){
                    this.$router.push({
                        path:'/circle',
                        query:{
                            id:data[0].id,
                            circleName:this.input
                        }
                    })
                }
            })
        }
    }
};
</script>

<style lang="scss">
.search{
    display: flex;
    align-items:center;
    padding:20px 16px;
}
</style>
