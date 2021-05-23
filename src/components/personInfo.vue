<template>
  <div>
    <div class="header">
      <div>个人信息</div>
      <div class="back" v-if="isEdit" @click="isEdit = false">取消</div>
      <div class="back" @click="$router.back(-1)" v-else>
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <span class="edit" v-if="!isEdit" @click="getEditValue()">编辑</span>
    </div>
    <div style="padding:10px">
      <div class="show">
        <div class="label">
          <span
            class="el-icon-user-solid"
            style="font-size:30px;color:#409EFF;margin-right:5px"
          ></span>
          <span>用户名</span>
        </div>
        <el-input
          v-if="isEdit"
          style="max-width:60%"
          v-model="tempUserName"
          placeholder="请输入用户名"
        ></el-input>
        <div class="info" v-if="!isEdit">{{ username }}</div>
      </div>
      <div class="divider"></div>
      <div class="show">
        <div class="label">
          <span
            class="el-icon-phone"
            style="font-size:30px;color:#67C23A;margin-right:5px"
          ></span>
          <span>手机号码</span>
        </div>
        <el-input
          v-if="isEdit"
          style="max-width:60%"
          v-model="tempPhone"
          placeholder="请输入手机号码"
        ></el-input>
        <div class="info" v-else>{{ phone }}</div>
      </div>
      <div class="divider"></div>
      <div class="show">
        <div class="label">
          <span
            class="el-icon-s-goods"
            style="font-size:30px;color:#E6A23C;margin-right:5px"
          ></span>
          <span>学号</span>
        </div>
        <el-input
          v-if="isEdit"
          style="max-width:60%;"
          v-model="tempStuNumber"
          placeholder="请输入学号"
        ></el-input>
        <div class="info" v-else>{{ studentNumber }}</div>
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <div
        v-if="isEdit"
        style="display:flex;justify-content:center;margin-top:30px"
      >
        <el-button style="width:90%" type="success">确定修改</el-button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      studentNumber: "",
      username: "",
      isEdit: false,
      tempPhone: "",
      tempStuNumber: "",
      tempUserName: "",
    };
  },
  methods: {
    getEditValue() {
      this.isEdit = true;
      this.tempPhone = this.phone;
      this.tempStuNumber = this.studentNumber;
      this.tempUserName = this.username;
    },
    confirm() {
      this.phone = this.tempPhone;
      this.studentNumber = this.tempStuNumber;
      this.username = this.tempUserName;
      this.isEdit = false;
    },
  },
  created() {
    this.phone = this.$store.state.user1.phone;
    this.studentNumber = this.$store.state.user1.studentNumber;
    this.username = this.$store.state.user1.username;
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
  .edit {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
}
.divider {
  display: block;
  width: 100%;
  background-color: #e7e9ec;
  height: 1px;
  margin: 16px 0 !important;
}
.label {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.info {
  color: #00000080;
}
</style>
