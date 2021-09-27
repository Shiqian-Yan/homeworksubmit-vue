<template>
<div>
  <el-card class="box-card">
      题目:{{homeworkData.title}}
  </el-card>
  <el-card class="box-card">
    次数:{{homeworkData.times}}
  </el-card>
  <el-card class="box-card">
    作业内容:<div v-html="homeworkData.content"></div>
  </el-card>
</div>
</template>

<script>
import homework from '../../api/teacher/homework'
export default {
  name: 'content',
  data(){
    return{
      homeworkData:{}
    }
  },
  created() {
    this.init()
  },
  methods:{
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id
        //调用根据id查询的方法

        this.getContent(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.homework = {}
      }
    },
    getContent(id){
      homework.getContent(id).then(response=>{
        this.homeworkData = response.data.homework
      })
    }
  }
}
</script>

<style scoped>

</style>
