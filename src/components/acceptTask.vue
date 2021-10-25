<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>已接受任务</div>
    </div>
    <task-list :task="task"></task-list>
      
  </div>
</template>

<script>
import taskList from './taskList.vue'
import { getTaskByGet, completeTask, getTask2 } from "../network/index";
export default {
  components: {
    taskList
  },
  data() {
    return {
      task: [],
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    getTask() {
      getTask2().then(({ code, data, message }) => {
          if (code == this.$code) {
            this.task = data.map(item => {
              return {
                ...item.task,
                picture: item.picture
              }
            })
          } else {
            throw message;
          }
        })
        .catch((err) => {
          this.$message(err);
        });
    }
    // flagStatus(status) {
    //   return !status ? "info" : "success";
    // },
    // getTask() {
    //   const stuNum = this.$store.state.user.stuNumber;
    //   getTaskByGet(stuNum).then(({ code, data, msg }) => {
    //     if (code == this.$code) {
    //       this.task = data;
    //       console.log(this.task);
    //     }
    //   });
    // },
    // completetask(taskId, index) {
    //   console.log(1);
    //   completeTask(taskId).then(code => {
    //     if (code == this.$code) {
    //       this.task[index].status = 0;
    //     }
    //   });
    // },
  },
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
