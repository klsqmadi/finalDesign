<template>
  <div class="m-2">
    <div class="search">
      <div slot="prepend" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px;margin-right:8px"></i>
      </div>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
        style="height:10px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search()"
        ></el-button>
      </el-input>
    </div>
    <el-divider></el-divider>
    <div>
      <div
        v-for="item in user"
        class="flex p-4 mb-5 mx-1 shadow-md bg-blue-200 items-center rounded-lg"
        @click="
          $router.push({
            name: 'chat',
            query: { nick: item.nick, fromId: userId, toId: item.uid },
          })
        "
      >
        <el-avatar class="mx-2 mt-2" :src="item.picture"></el-avatar>
        <div class="text-lg ml-2">{{ item.nick }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchUser } from "../network/index";
export default {
  data() {
    return {
      input: "",
      user: [],
      userId: ''
    };
  },
  created() {
    this.userId = window.localStorage.getItem('userId')
  },
  methods: {
    search() {
      searchUser({ nick: this.input })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
              this.user = data
          } else {
            throw message;
          }
        })
        .catch((err) => {
          this.$message(err);
        });
    },
    // goToCircle(){
    //     getCircleByName(this.input).then(({code,data})=>{
    //         if(code == this.$code){
    //             this.$router.push({
    //                 path:'/circle',
    //                 query:{
    //                     id:data[0].id,
    //                     circleName:data[0].name
    //                 }
    //             })
    //         }
    //     })
    // }
  },
};
</script>

<style lang="scss">
.search {
  display: flex;
  align-items: center;
  padding: 20px 0px;
}
</style>
