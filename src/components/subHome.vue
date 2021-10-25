<template>
  <div>
    <div class="header">
      <div class="title">主页</div>
      <div class="btn">
        <i
          class="el-icon-search"
          style="margin:0 10px"
          @click="$router.push('/searchCircle')"
        ></i>
        <i
          class="el-icon-circle-plus-outline"
          @click="$router.push('/task')"
        ></i>
      </div>
    </div>
    <div v-if="task.length !== 0" class="bg-gray-400">
      <task-list :task="task"></task-list>
    </div>
    <el-empty v-else description="附近暂无任务"></el-empty>
  </div>
</template>

<script>
import taskList from './taskList.vue'
import { getCircleListReq, getSearchTaskReq, receiveTask } from "../network/index";
export default {
  components: {
    taskList
  },
  data() {
    return {
      task: [],
    };
  },
  methods: {
    goToDetail(id, circleName) {
      this.$router.push({
        path: "/circle",
        query: {
          id,
          circleName,
        },
      });
    },
    accept(item) {
      console.log('item: ', item);
      receiveTask({ taskId: item.tid }).then(({ code, data, message }) => {
        if(code == this.$code) {
          item.accept = true
        } else {
          this.$message(message)
        }
      })
    },
    // getCircleListReq(){
    //   getCircleListReq(this.$store.state.user.stuNumber).then(({code,data})=>{
    //     console.log(this.$code == code,'----------------')
    //     if(code == this.$code){
    //       this.circle = data
    //       console.log(this.circle)
    //       console.log(data)
    //     }
    //   })
    // }
    getSearchTask() {

      window.navigator.geolocation.getCurrentPosition(({coords}) => {
        let { latitude, longitude } = coords
        this.$store.commit('setLL', {latitude, longitude})
        console.log('latitude, longitude: ', latitude, longitude);
        getSearchTaskReq({latitude: latitude.toFixed(6), longitude: longitude.toFixed(6)}).then(({code, message, data}) => {
          if(code == this.$code) {
            this.task = data.map(item => ({...item, accept: false}))
          } else {
            this.$message(message)
          }
        })
      });
    },
  },
  created() {
    this.getSearchTask()
  },
  mounted() {
    // this.getCircleListReq()
  },
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
