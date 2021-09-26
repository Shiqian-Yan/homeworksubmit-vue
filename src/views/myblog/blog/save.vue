<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="题目">
        <el-input v-model="blogcontent.title"/>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="blogcontent.classId" clearable placeholder="请选择">
          <div v-for=" item in classData">
          <el-option :value="item.id" :label="item.title"/>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="blogcontent.description" />
      </el-form-item>

      <el-form-item label="内容">
        <tinymce :height="300" v-model="blogcontent.content"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import blogApi from '../../../api/myblog/blog'
import ImageCropper from '../../../components/ImageCropper'
import PanThumb from '../../../components/PanThumb'
import Tinymce from '@/components/Tinymce'
import classApi from '../../../api/myblog/class'
export default {
  components:{ImageCropper,PanThumb,Tinymce},
  data() {
    return {
      blogcontent:{
        title: '',
        description: '',
        content: ''

      },
      classData: null,
      saveBtnDisabled:false , // 保存按钮是否禁用,
      imagecropperShow:false,
      imagecropperKey:0,
      BASE_API:process.env.BASE_API
    }
  },
  created() { //页面渲染之前执行
    this.init()
    this.getClassData()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id
        //调用根据id查询的方法

        this.getInfo(id)
     } else { //路径没有id值，做添加
        //清空表单
        this.blogcontent = {}
      }
    },
    getClassData(){
      classApi.getAllClass().then(response=>{
           this.classData= response.data.data
      })
    },
    //根据讲师id查询的方法
    getInfo(id) {
      blogApi.getBlogInfo(id)
        .then(response => {
          console.log(response.data.blogcontent)
          this.blogcontent = response.data.blogcontent
        })
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if(!this.blogcontent.id) {
        //添加
        this.saveBlog()
      } else {
        //修改
        this.updateBlog()
      }
    },
    //修改讲师的方法
    updateBlog() {
      const id = this.$route.params.id
      blogApi.updateBlogInfo(this.blogcontent,id)
        .then(response => {
          //提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/blog/table'})
        })
    },
    //添加讲师的方法
    saveBlog() {
      blogApi.addBlog(this.blogcontent)
        .then(response => {//添加成功
          //提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/blog/table'})
        })
    },
    close(){//
       this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1;
    }

  }
}
</script>
