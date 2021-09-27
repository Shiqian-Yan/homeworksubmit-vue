<template>
  <div class="app-container">

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row> //自动遍历

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"/>
      <el-table-column label="课程名" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-for="item in classData">
            <div v-if="item.id ==scope.row.courseId">{{item.title}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开课学年" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-for="item in classData">
            <div v-if="item.id ==scope.row.courseId">{{item.year}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="times" label="第几次作业" width="160"/>
      <el-table-column prop="stuId" label="学号" :show-overflow-tooltip="true"/>
      <el-table-column prop="stuClass" label="班级" :show-overflow-tooltip="true"/>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="end" label="截止时间" width="160"/>
      <el-table-column label="在截止时间前几天交的" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
         {{getDateTime(scope.row.end,scope.row.gmtCreate)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          提交成功
<!--          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>

</template>
<script>

import { getToken } from '@/utils/auth'
import homeworkSubmit from '../../api/student/submit'
import classApi from '../../api/myblog/class'
import homework from '../../api/teacher/homework'
export default {
  data() {
    const hasToken = getToken()
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
      importHeaders: {token: hasToken},
      list:null,//查询之后接口返回集合
      page:1,//当前页
      limit:10,//每页记录数
      total:0,//总记录数
      classData: null,
      timeLate:''
    }
  },
  created() {
    this.getList()
    this.getClassData()
  },
  methods:{
    getDateTime(date1,date2) {
      var dateSpan, iDays;
      date1 = new Date(date1)
      date2 = new Date(date2)
      let sDate1 = date1.getTime();
      let sDate2 = date2.getTime();
      dateSpan = sDate1 - sDate2;
      var str
      if(dateSpan<0){
        str="晚交了"
      }else{
        str="提前交了"
      }
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return str+Math.abs(iDays)+"天"
    },

    getList(page=1) {
      this.page = page
      homeworkSubmit.getSubmitHomeworkListPage(this.page,this.limit)
        .then(response =>{//请求成功
          //response接口返回的数据
          console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })

    },
    getClassData(){
      classApi.getAllClass().then(response=>{
        this.classData= response.data.data
      })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击确定，执行then方法
        //调用删除的方法
        homeworkSubmit.deleteSubmitHomeworkId(id)
          .then(response =>{//删除成功
            //提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //回到列表页面
            this.getList()
          })
      }) //点击取消，执行catch方法
    }


  }
}
</script>
