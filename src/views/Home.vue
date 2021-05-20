<template>
  <div id="container">
    <div class="content">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
    <el-row type="flex" id="footer">
      <el-col :span="12" class="navigation">
        <div @click="switchRouter('/home/subHome')">
          <div>
            <i
              :class="{ active: isRouterActive }"
              class="el-icon-house icon"
            ></i>
          </div>
          <div class="text" :class="{ active: isRouterActive }">首页</div>
        </div>
      </el-col>
      <el-col :span="12" class="navigation">
        <div @click="switchRouter('/home/profile')">
          <div>
            <i
              class="el-icon-setting icon"
              :class="{ active: !isRouterActive }"
            ></i>
          </div>
          <div class="text" :class="{ active: !isRouterActive }">我的</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouterActive: true,
    };
  },
  methods: {
    switchRouter(route) {
      if (this.$route.path != route) {
        this.isRouterActive = !this.isRouterActive;
        this.$router.push(route);
      }
    },
  },
};
</script>

<style lang="scss">
#container {
  height: 100vh;
  #footer {
      box-sizing: border-box;
    height: 5vh;
    width: 100vw;
    position: fixed;
    bottom: 2vh;
    .navigation {
      color: #409eff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      a {
        text-decoration: none;
      }
      .icon {
        color: #303133;
        font-size: 36px;
      }
      .text {
        color: #303133;
        font-size: 14px;
      }
      .active {
        color: #409eff;
      }
    }
  }
  .content{
      height: 91vh;
      background: #ffffff;
      overflow: auto;
  }
}
</style>
