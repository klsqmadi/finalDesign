<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>已接受任务</div>
    </div>
    <el-row
      style="padding:6px 14px;border-bottom:6px #00000010 solid"
      v-for="(item, index) in task"
    >
      <el-col :span="24" style="margin-bottom:4px">{{ item.title }}</el-col>
      <el-col
        style="font-size:14px;margin-bottom:6px;color:#00000080;text-indent:2em"
        >{{ item.content }}</el-col
      >
      <el-col :span="24"
        ><el-button
          size="mini"
          style="float:right;margin:6px 0"
          class="clearfix"
          :type="flagStatus(item.status)"
          @click="completetask(item.id, index)"
          >{{ !item.status ? "已完成" : "完成任务" }}</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { getTaskByGet, completeTask } from "../network/index";
export default {
  data() {
    return {
      task: [],
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    flagStatus(status) {
      return !status ? "info" : "success";
    },
    getTask() {
      const stuNum = this.$store.state.user.stuNumber;
      getTaskByGet(stuNum).then(({ code, data, msg }) => {
        if (code == this.$code) {
          this.task = data;
          console.log(this.task);
        }
      });
    },
    completetask(taskId, index) {
      console.log(1);
      completeTask(taskId).then(code => {
        if (code == this.$code) {
          this.task[index].status = 0;
        }
      });
    },
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
