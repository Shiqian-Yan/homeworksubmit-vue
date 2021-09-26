<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="homeworkQuery.title" placeholder="作业题目"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="homeworkQuery.classId" clearable placeholder="请选择课程名">
          <div v-for="item in classData">
            <el-option :value="item.id" :label="item.title"/>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="homeworkQuery.times" placeholder="第几次作业"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="homeworkQuery.content" placeholder="作业内容"/>
      </el-form-item>
      <br>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="homeworkQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="homeworkQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

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

      <el-table-column prop="title" label="题目" :show-overflow-tooltip="true"/>
      <el-table-column label="课程名" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-for="item in classData">
            <div v-if="item.id ==scope.row.classId">{{item.title}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开课学年" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-for="item in classData">
            <div v-if="item.id ==scope.row.classId">{{item.year}}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="times" label="第几次作业" :show-overflow-tooltip="true"/>
      <el-table-column prop="content" label="内容" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作(重复提交可覆盖)" width="200" align="center">
        <template slot-scope="scope">
          <div v-for="item in classData">
                  <el-upload
                    v-if="item.id ==scope.row.classId"
                    ref="upload"
                    :headers="importHeaders"
                    :auto-upload="true"
                    :on-success="fileUploadSuccess"
                    :on-error="fileUploadError"
                    :disabled="importBtnDisabled"
                    :limit="1"
                    :action="BASE_API+`/student/homeworksubmit/upload/${scope.row.classId}/${scope.row.times}/`+item.year"
                    name="file"
                    >
                    <el-button slot="trigger" size="small" type="primary">提交文件</el-button>
<!--                    <el-button-->
<!--                      :loading="loading"-->
<!--                      style="margin-left: 10px;"-->
<!--                      size="small"-->
<!--                      type="success"-->
<!--                      >上传到服务器</el-button>-->
                  </el-upload>
          </div>
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
import homework from '../../api/teacher/homework'
import classApi from '../../api/myblog/class'
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
      homeworkQuery:{}, //条件封装对象
      classData: null,
      uploadName:""

    }
  },
  created() {
    this.getList()
    this.getClassData()
  },
  methods:{
    getList(page=1) {
      this.page = page
      homework.getHomeworkListPage(this.page,this.limit,this.homeworkQuery)
        .then(response =>{//请求成功
          //response接口返回的数据

          console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })

    },
    getYear(id){
       for(var i=0;i<this.classData.length();i++){
         if(this.classData[i].id==id){
             return this.classData[i].year;
         }
       }
    },
    getClassData(){
      classApi.getAllClass().then(response=>{
        this.classData= response.data.data

      })
    },
    resetData() {//清空的方法
      //表单输入项数据清空
      this.homeworkQuery = {}
      //查询所有讲师数据
      this.getList()
    },
    //删除讲师的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击确定，执行then方法
        //调用删除的方法
        homework.deleteHomeworkId(id)
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
    },


    //点击按钮上传文件到接口里面
    submitUpload() {
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    //上传成功
    fileUploadSuccess(response) {
      //提示信息
      this.loading = false
      this.importBtnDisabled = false
      this.$message({
        type: 'success',
        message: '添加课程分类成功'
      })
      //跳转课程分类列表
      //路由跳转
      this.$router.push({path:'/submit/list'})
    },
    //上传失败
    fileUploadError() {
      this.loading = false
      this.$message({
        type: 'error',
        message: '添加课程分类失败'
      })
    }
  }
}
</script>
