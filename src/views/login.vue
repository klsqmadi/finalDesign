<template>
  <div id="home">
    <el-row style="margin:2px 0;text-align:center">
      <i class="el-icon-truck" style="color:#67C23A;margin-right:4px"></i>
      <span>校园捎物信息共享平台</span>
    </el-row>
    <el-row>
      <el-image
        fit="cover "
        src="https://cdn.dribbble.com/users/1534154/screenshots/4052203/the-creative-factory-that-inspired-you.png?compress=1&resize=800x600"
      ></el-image>
    </el-row>
    <el-collapse-transition>
      <div v-if="isShowLoginPage">
        <el-row type="flex" style="margin-top:10px;padding:4px 6px">
          <el-col :span="8" class="inputTag">
            <div style="padding:0 10px"><i class="el-icon-user"></i></div>
            <div><span>学号</span></div>
          </el-col>
          <el-col>
            <el-input
              placeholder="请输入学号"
              clearable
              v-model="loginStuNum"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:2px;padding:4px 6px">
          <el-col :span="8" class="inputTag">
            <div style="padding:0 10px"><i class="el-icon-key"></i></div>
            <div><span>密码</span></div>
          </el-col>
          <el-col>
            <el-input
              placeholder="请输入密码"
              show-password
              v-model="loginPassword"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px" type="flex" justify="center">
          <el-button type="success" style="width:96vw" @click="loginReq()">登录</el-button>
        </el-row>
        <el-row
          type="flex"
          justify="space-between"
          style="color:#909399;margin-top:6px;padding:4px"
        >
          <div href="" class="forget">找回密码</div>
          <div
            href=""
            class="register"
            @click="isShowLoginPage = !isShowLoginPage"
          >
            注册
          </div>
        </el-row>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-if="!isShowLoginPage">
        <el-row type="flex" style="margin-top:10px;padding:4px 6px">
          <el-col :span="8" class="inputTag">
            <div style="padding:0 10px"><i class="el-icon-user-solid"></i></div>
            <div><span>用户名</span></div>
          </el-col>
          <el-col>
            <el-input
              placeholder="请输入用户名"
              clearable
              v-model="register.name"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:2px;padding:4px 6px">
          <el-col :span="8" class="inputTag">
            <div style="padding:0 10px"><i class="el-icon-s-goods"></i></div>
            <div><span>密码</span></div>
          </el-col>
          <el-col>
            <el-input
              placeholder="请输入密码"
              show-password
              v-model="register.password"
            ></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top:2px;padding:4px 6px">
          <el-col :span="8" class="inputTag">
            <div style="padding:0 10px"><i class="el-icon-s-flag"></i></div>
            <div><span>重复密码</span></div>
          </el-col>
          <el-col>
            <el-input
              placeholder="请确认密码"
              clearable
              v-model="register.stuNumber"
            ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:2px;padding:4px 6px">
          <el-col :span="8" class="inputTag">
            <div style="padding:0 10px"><i class="el-icon-phone"></i></div>
            <div><span>手机号码</span></div>
          </el-col>
          <el-col>
            <el-input
              placeholder="请输入手机号码"
              clearable
              v-model="register.phone"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px" type="flex" justify="center">
          <el-button type="success" style="width:96vw" @click="registerReq()"
            >注册</el-button
          >
        </el-row>
        <el-row
          type="flex"
          justify="space-between"
          style="color:#909399;margin-top:6px;padding:4px"
        >
          <div
            href=""
            class="register"
            @click="isShowLoginPage = !isShowLoginPage"
          >
            登录
          </div>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import { registerReq, loginReq, register} from "../network/index.js";
export default {
  name: "Home",
  data() {
    return {
      loginStuNum: "",
      loginPassword: "",
      register: {
        name: "",
        password: "",
        phone: "",
        stuNumber: "",
      },
      isShowLoginPage: true,
    };
  },
  methods: {
    registerReq() {
      let { name:nick, password, stuNumber: password2, phone: telephoneNumber } = this.register
      register({ nick, password, password2, telephoneNumber }).then(({ code, message, data }) => {
        if(code == this.$code) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.isShowLoginPage = !this.isShowLoginPage
          window.localStorage.setItem('token', '')
        } else {
          this.$message(message)
        }
      })
      // const register = this.register;
      // const { name, password, phone, stuNumber } = register;
      // registerReq(password.toString(), phone.toString(), password.toString(), stuNumber.toString(), name.toString()).then(({code,data,msg}) => {
      //   if(code == this.$code){
      //     this.isShowLoginPage = !this.isShowLoginPage
      //   }else{
      //     this.$message(msg)
      //   }
      // });
      // registerReq(18102857367,18102857367,18102857367,3119004823,18102857367).then(res=>{
      //   console.log(res)
      // })
      // register().then(res=>{
      //   console.log(res)
      // })
    },
    loginReq() {
      loginReq(this.loginStuNum,this.loginPassword).then(({code, data , message}) => {
        if(code == this.$code){
          window.localStorage.setItem('token', data.jwtToken)
          window.localStorage.setItem('userId', data.userId)
          // this.$store.commit('token', data.jwtToken)
          // this.$store.commit('setUser',data.studentNumber)
          // this.$store.commit('setUserName',data.username)
          // this.$store.commit('setUserLast',data)
          this.$router.push('/home')
        }else{
          this.$message(message)
        }
      });
    },
  },
};
</script>
<style lang="scss">
.inputTag {
  display: flex;
  // justify-content: space-around;
  align-items: center;
  color: #909399;
}
</style>
