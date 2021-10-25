<template>
  <div>
    <div class="header">
      <div>我的</div>
    </div>
    <div>
      <div @click="$router.push('/personInfo')">
        <el-row style="padding:20px;margin-bottom:20px" type="flex">
          <el-col :span="6" style="padding:0 10px">
            <el-avatar
              size="large"
              style="width:60px;height:60px"
              :src="info.avatar"
            ></el-avatar>
          </el-col>
          <el-col :span="14" style="padding-top:4px">
            <div>{{ info.nick }}</div>
            <div style="font-size:14px;color:#00000060">
              查看个人主页或编辑资料
            </div>
          </el-col>
          <el-col
            :span="4"
            style="display:flex;justify-content:center;align-items:center"
            ><i class="el-icon-arrow-right" style="font-size:18px"></i
          ></el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row style="padding:20px">
        <div>
          <el-row type="flex" align="middle" style="margin-bottom:30px">
            <el-col :span="3" style="padding:0 10px"
              ><i
                class="el-icon-money"
                style="color:#2ecc71;font-size:24px;"
              ></i
            ></el-col>
            <el-col :span="14" style="font-size:16px">余额</el-col>
            <el-col :span="8" style="font-size:16px" class="text-right">{{info.balance}}</el-col>
            <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
          </el-row>
        </div>
        <div @click="$router.push('/publishTask')">
          <el-row type="flex" align="middle" style="margin-bottom:30px">
            <el-col :span="3" style="padding:0 10px"
              ><i
                class="el-icon-s-fold"
                style="color:#409EFF;font-size:24px;"
              ></i
            ></el-col>
            <el-col :span="16" style="font-size:16px">已发布任务</el-col>
            <el-col :span="6" style="font-size:16px" class="text-right">{{info.publishTaskNumber}}</el-col>
            <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
          </el-row>
        </div>
        <div @click="$router.push('/acceptTask')">
          <el-row type="flex" align="middle">
            <el-col :span="3" style="padding:0 10px"
              ><i
                class="el-icon-s-fold"
                style="color:#F56C6C;font-size:24px;"
              ></i
            ></el-col>
            <el-col :span="16" style="font-size:16px">已接受任务</el-col>
            <el-col :span="6" style="font-size:16px" class="text-right">{{info.receiveTaskNumber}}</el-col>
            <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getUserById } from "../network/index";
export default {
  data() {
    return {
      userId: 0,
      info: {
        avatar: "",
        balance: 0,
        nick: "0",
        password: 0,
        publishTaskNumber: 0,
        receiveTaskNumber: 0,
        telephoneNumber: "0",
        uid: 0,
      },
    };
  },
  created() {
    this.userId = window.localStorage.getItem("userId");
    getUserById({ id: this.userId })
      .then(({ code, message, data }) => {
        if (code == this.$code) {
          this.info = data
        } else {
          throw message;
        }
      })
      .catch((err) => {
        this.$message(err);
      });
    // this.userName = this.$store.state.user.name;
    // console.log("this.userName: ", this.userName);
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
}
</style>
