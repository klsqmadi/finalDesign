<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size: 20px"></i>
      </div>
      <div>任务详情</div>
    </div>
    <div class="p-6">
      <div
        v-if="!(isMe && task.taskStatus == 0)"
        class="flex items-center mb-6"
        @click="
          $router.push({
            name: 'chat',
            query: { nick: user.nick, fromId: userId, toId: task.userId },
          })
        "
      >
        <el-avatar size="large" :src="user.avatar"></el-avatar>
        <div class="ml-6 text-lg font-bold">{{ user.nick }}</div>
      </div>
      <div class="mb-6">
        <div class="text-blue-600">任务类型:</div>
        <div class="ml-4 mt-4">{{ getTaskType(task.typeId) }}</div>
        <el-divider></el-divider>
      </div>
      <div class="mb-6">
        <div class="text-blue-600">任务报酬:</div>
        <div class="ml-4 mt-4">{{ task.taskReward }}</div>
        <el-divider></el-divider>
      </div>
      <div class="mb-6">
        <div class="text-blue-300">结束时间:</div>
        <div class="ml-4 mt-4">{{ task.endTime }}</div>
        <el-divider></el-divider>
      </div>
      <div class="mb-6">
        <div class="mb-4">任务描述</div>
        <div class="shadow-md p-4">{{ task.taskDetail }}</div>
      </div>
      <div >
        <el-button
          type="success"
          class="w-full"
          @click="receive"
          v-if="!isMe && task.taskStatus == 0"
          >接受任务</el-button
        >
        <el-button
          type="primary"
          class="w-full"
          @click="complete"
          v-if="!isMe && task.taskStatus == 1"
          >待完成(点击进行完成)</el-button
        >
        
        <el-button
          type="success"
          class="w-full"
          @click="confirm"
          v-if="isMe && task.taskStatus == 2 && userId == task.userId"
          >已完成待确认(点击进行确认)</el-button
        >
        <el-button
          type="success"
          class="w-full"
          v-if="task.taskStatus == 3"
          :disabled="true"
          >已完成</el-button
        >
      </div>
      <div class="mt-4">
        <el-button
          type="success"
          class="w-full"
          @click="deleteTask"
          v-if="isMe && task.taskStatus == 0"
          >删除任务</el-button
        >
        <el-button
            type="danger"
            class="w-full"
            @click="abandon"
            v-if="!isMe && task.taskStatus == 1"
            >放弃任务(点击进行放弃)</el-button
          >
      </div>
    </div>
    <div v-if="task.taskStatus == 3" class="m-5">
      <div class="font-bold text-xl">评论</div>
      <el-divider></el-divider>
      <div>
        <div class="text-sm mb-2 text-gray-400">说点什么</div>
        <div class="flex items-end">
          <el-input type="textarea" v-model="commentContent"></el-input>
          <div class="ml-4">
            <el-button size="mini" type="success" @click="commentMethod">发送</el-button>
          </div>
        </div>
      </div>
      <div v-if="comment.length == 0">
        <el-empty description="该任务暂无评论"></el-empty>
      </div>
      <div v-else class="mt-10">
        <div v-for="item in comment">
          <div class="flex">
            <el-avatar class="mx-2" :src="item.avatar"></el-avatar>
            <div class="ml-2 flex-grow">
              <div class="text-pink-600 mb-1">{{ item.nick }}：</div>
              <div style="text-indent: 0.5rem" class="text-gray-500 text-sm">{{ item.commentContent }}</div>
              <div class="mt-2 text-right text-xs text-gray-400">{{ item.commentTime }}</div>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- <div class="divide-x-4 divide-purple-900 divide-solid"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTaskById,
  getUserById,
  receiveTask,
  completeTask,
  confirmTask,
  getComment,
  putComment,
  abandonTask,
  cancelTask
} from "../network/index";
export default {
  name: "taskDetail",
  data() {
    return {
      userId: "",
      taskId: "",
      taskOnwerId: "",
      task: {
        userId: "",
        tid: "",
        taskStatus: "",
        endTime: "",
        taskReward: "",
        typeId: "",
        taskDetail: "",
      },
      user: {
        nick: "",
        avatar: "",
      },
      comment: [],
      commentContent: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.currentPath = from.name;
    });
  },
  created() {
    this.userId = window.localStorage.getItem("userId");
    let { taskId, taskOnwerId } = this.$route.query;
    this.taskOnwerId = taskOnwerId;
    this.taskId = taskId;
    this.getTask();
    this.getCommentById();
  },
  methods: {
    deleteTask() {
      let { taskId } = this
      
      cancelTask({ taskId }).then(({ code, message, data }) => {
        if(code == this.$code) {
          this.task.taskStatus = 4
          this.$message({
            message: '取消成功',
            type: 'success'
          })
        } else {
          throw message
        }
      }).catch(err => {
        this.$message(err)
      })
    },
    abandon() {
      let { taskId } = this
      abandonTask({ taskId }).then(({ code, message, data }) => {
        if(code == this.$code) {
          this.task.taskStatus = 0
          this.$message({
            message: '放弃成功',
            type: 'success'
          })
        } else {
          throw message
        }
      }).catch(err => {
        this.$message(err)
      })
    },
    commentMethod() {
      let { commentContent, taskId, userId } = this
      putComment({ commentContent, taskId, userId }).then(({ code, message, data }) => {
        console.log(1)
        if(code == this.$code) {
          console.log(2)
          this.getCommentById()
          this.commentContent = ''
          console.log(4654)
        } else {
          console.log(3)
          throw message
        }
      }).catch((err) => {
        // this.$message(err)
      })
    },
    getCommentById() {
      console.log(1);
      getComment({ id: this.taskId })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
            this.comment = data.map((item) => {
              return {
                ...item.taskComment,
                ...item.user,
              };
            });
          } else {
            throw message;
          }
        })
        .catch((err) => {
          this.$message(err);
        });
    },
    getTask() {
      let that = this
      getTaskById({ taskId: this.taskId })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
            this.task = data;
            if (this.isMe) {
              if (data.taskStatus != 0) {
                return getUserById({ id: data.receiveUserId });
              } else {
                return new Promise();
              }
            } else {
              return getUserById({ id: data.userId });
            }
            // let id = this.isMe ? data.userId :
            // return getUserById({ id })
          } else {
            throw message;
          }
        })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
            this.user = data;
          } else {
            throw message;
          }
        })
        .catch((err) => {
          // that.$message(err);
        });
    },
    complete() {
      completeTask({ taskId: this.taskId })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
            this.task.taskStatus = 2;
            this.$message({
            message: '完成成功',
            type: 'success'
          })
          } else {
            throw message;
          }
        })
        .catch((err) => {
          this.$message(err);
        });
    },
    confirm() {
      confirmTask({ taskId: this.taskId })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
            this.task.taskStatus = 3;
            this.$message({
            message: '确认成功',
            type: 'success'
          })
          } else {
            throw message;
          }
        })
        .catch((err) => {
          this.$message(err);
        });
    },
    receive() {
      receiveTask({ taskId: this.taskId })
        .then(({ code, message, data }) => {
          if (code == this.$code) {
            this.task.taskStatus = 1;
          } else {
            throw message;
          }
        })
        .catch((err) => {
          this.$message(err);
        });
    },
    getTaskType(typeId) {
      return this.TaskType[typeId];
    },
  },
  computed: {
    TaskType() {
      return ["快递", "外卖", "买东西", "其他"];
    },
    isMe() {
      return this.userId == this.taskOnwerId;
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
