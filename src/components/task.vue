<template>
  <div>
    <div class="header">
      <div class="back" @click="$router.back(-1)">
        <i class="el-icon-back" style="font-size:20px"></i>
      </div>
      <div>发布任务</div>
    </div>
    <div>
      <el-row>
        <el-col style="text-align:center"
          ><span>请填写您要发布的任务信息</span></el-col
        >
      </el-row>
      <el-form :model="form" ref="form" style="padding:20px">
        <el-form-item label="任务描述">
          <el-input
            v-model="form.taskDetail"
            placeholder="填写任务信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务奖励">
          <el-input
            v-model="form.taskReward"
            placeholder="请填写任务奖励"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务结束时间">
            <div class="w-full">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="form.endTime" type="datetime" placeholder="选择日期" class="w-full"></el-date-picker>

            </div>
          <!-- <el-input
            v-model="form.endTime"
            placeholder="请填写截止时间"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="任务类型">
          <el-select v-model="form.typeId" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in option"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="联系方式">
                <el-input v-model="form.phone" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="具体信息">
                <el-input type="textarea" v-model="form.details"></el-input>
            </el-form-item> -->
      </el-form>
      <el-row class="mb-10">
        <el-col style="display:flex;justify-content:center"
          ><el-button type="success" style="width:90vw" @click="confirm()"
            >发布信息</el-button
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { putPublishTask } from "../network/index";
export default {
  data() {
    return {
      form: {
        taskDetail: "",
        taskReward: "",
        endTime: "",
        typeId: "",
      },
      option: [
        {
          value: 1,
          label: "快递",
        },
        {
          value: 2,
          label: "外卖",
        },
        {
          value: 3,
          label: "买东西",
        },
        {
          value: 4,
          label: "其他",
        },
      ],
    };
  },
  created() {
    // const {id} = this.$route.query
    // this.circleId = id
    // this.stuNumber = this.$store.state.user.stuNumber
    // console.log(this.stuNumber)
  },
  methods: {
    confirm() {
      let { latitude, longitude } = this.$store.state;
      console.log('latitude, longitude: ', latitude, longitude);
      let { endTime, taskDetail, taskReward, typeId } = this.form;
      let obj = {
        latitude,
        longitude,
        endTime,
        taskDetail,
        taskReward,
        typeId,
      };
      putPublishTask(obj).then(({ code, data, message }) => {
        if (code == this.$code) {
          this.$message({
            message: "发布成功",
            type: "success",
          });
          this.$router.go(-1);
        } else {
          throw message
        }
      }).catch((err) => {
        this.$message(err);
      })
    },
    // confirm(){
    //     const content = `送达地点:${this.form.address}-截止时间:${this.form.time}-联系方式:${this.form.phone}-${this.form.details}`
    //     putAddTask(this.circleId,content,this.form.title,this.stuNumber).then((res)=>{
    //         if(res == this.$code){
    //             this.$router.go(-1)
    //         }
    //     })
    // }
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
