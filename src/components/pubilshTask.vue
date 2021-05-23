<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>已发布任务</div>
    </div>
    <el-row
      style="padding:6px 14px;border-bottom:6px #00000010 solid"
      v-for="(item, index) in task" :key="index"
    >
      <el-col>
        <el-col style="margin-bottom:4px">{{ item.title }}</el-col>
      </el-col>
      <el-col>
        <el-col
          style="font-size:14px;margin-bottom:6px;color:#00000080;text-indent:2em"
          >{{ item.content }}</el-col
        >
      </el-col>
      <el-col style="display:flex;justify-content: flex-end;margin-top:8px">
        <div v-if="!item.flagIsDelete && !item.status"
        style="margin:0 6px"
          ><el-button
            size="mini"
            style="float:right"
            class="clearfix"
            plain
            @click="deleteTask(item.id, index)"
            >删除任务</el-button
          ></div
        >
        <div  v-if="item.flagIsDelete"
        style="margin:0 6px"
          ><el-button
            size="mini"
            style="float:right"
            class="clearfix"
            plain
            type="danger"
            >已删除</el-button
          ></div
        >
        <div v-else
        style="margin:0 6px"
          ><el-button
            size="mini"
            style="float:right"
            class="clearfix"
            plain
            :type="flagStatus(item.status)"
            >{{ item.status == 2 ? "已完成" : item.status == 1?'待完成':'待接受' }}</el-button
          ></div
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTaskByPost, deleteTaskReq } from "../network/index";
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
    deleteTask(taskId, index) {
      deleteTaskReq(taskId).then((res) => {
        if (res) {
          this.task[index].flagIsDelete = 1;
        }
      });
    },
    flagStatus(status) {
      return status == 2 ? "info" :status == 1?'success':'primary';
    },
    getTask() {
      const stuNum = this.$store.state.user.stuNumber;
      getTaskByPost(stuNum).then(({ code, data, msg }) => {
        if (code == this.$code) {
          console.log('data: ', data);
          data.forEach(item=>{
            item.flagIsDelete = 0
          })
          this.task = data
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
