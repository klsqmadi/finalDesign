<template>
  <div>
    <el-card
        :body-style="{ padding: '2px' }"
        v-for="(item, index) in task"
        :key="index"
      >
        <div  @click="$router.push({path: '/taskDetail', query: { taskId: item.tid, taskOnwerId: item.userId }})">
          <el-row class="bg-gray-50 px-6 m-2" type="flex" style="height:110px;" align="middle">
            <el-col :span="6" class="image">
              <el-image
                style="width: 50px; height: 50px;border-radius:100%"
                fit="cover"
                :src="item.picture"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-col>
            <el-col class="flex flex-col">
              <div class="mb-2 font-bold text-lg">{{type[item.typeId + 1]}}</div>
              <div class="text-sm mb-1" style="color:#303133">{{ item.taskDetail }}</div>
              <!-- <el-button v-if="!item.accept" size="mini" class="w-20 self-end" type="primary" @click.stop="accept(item)">接受任务</el-button> -->
              <el-tag class="min-w-min self-end" :type="taskStatus(item.taskStatus).type">{{taskStatus(item.taskStatus).status}}</el-tag>
            </el-col>
          </el-row>
        </div></el-card
      >
  </div>
</template>

<script>
export default {
  name: 'taskList',
  props: {
    task: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      type: ['快递', '外卖', '买东西', '其他'],
      status: [
        {
          status: '待接受',
          type: 'success'
        },
        {
          status: '待完成',
          type: 'primary'
        },
        {
          status: '已完成待确认',
          type: 'warning'
        },
        {
          status: '已完成已确认',
          type: 'info'
        },
      ]
    }
  },
  methods: {
    taskStatus(i) {
      return this.status[i]
    }
  },
  
}
</script>

<style>

</style>