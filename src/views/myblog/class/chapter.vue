<template>

  <div class="app-container">
    <h2 style="text-align: center;">添加分类</h2>
    <el-button type="text" @click="openChapterDialog()">添加分类</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}（{{chapter.year}}学年）

          <span class="acts">
                    <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">结课</el-button>
                </span>
        </p>

        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>{{ video.title }}

              <span class="acts">

                    <el-button style="" type="text" @click="openEditChatper(video.id)">编辑</el-button>
                    <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                </span>
            </p>
          </li>
        </ul>

      </li>
    </ul>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加或修改分类">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="开课学年">
          <el-select v-model="chapter.year" placeholder="请选择">
          <div v-for="item in 20">
            <el-option :label="item+2020+'春季'" :value="item+2020+'春季'"></el-option>
            <el-option :label="item+2020+'秋季'" :value="item+2020+'秋季'"></el-option>
          </div>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加子分类">
      <el-form :model="video" label-width="120px">
        <el-form-item label="子分类名称">
          <el-input v-model="video.title"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>

import classApi from '@/api/myblog/class'
export default {
  data() {
    return {
      saveBtnDisabled:false,
      chapterVideoList:[],
      chapter:{ //封装章节数据
        id: '',
        title: '',
        year:''
      },
      video: {
        id: '',
        title: '',
      },
      dialogChapterFormVisible:false,//章节弹框
      dialogVideoFormVisible:false, //小节弹框
      BASE_API: process.env.BASE_API,

    }
  },
  created() {
    //获取路由的id值
      this.getChapterVideo()
  },
  methods:{

//==============================小节操作====================================
    //删除小节
    removeVideo(id) {
      this.$confirm('此操作将删除小节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击确定，执行then方法
        //调用删除的方法
        classApi.deleteChapter(id)
          .then(response =>{//删除成功
            //提示信息
            this.$message({
              type: 'success',
              message: '删除小节成功!'
            });
            //刷新页面
            this.getChapterVideo()
          })
      }) //点击取消，执行catch方法
    },
    //添加小节弹框的方法
    openVideo(chapterId) {
      //弹框
      this.dialogVideoFormVisible = true
      //清空
      this.video = {}
      this.fileList = []
      //设置章节id
      this.video.parentId = chapterId
    },
    //添加小节
    addVideo() {
      classApi.addSecChapter(this.video.parentId,this.video)
        .then(response => {
          //关闭弹框
          this.dialogVideoFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '添加小节成功!'
          });
          //刷新页面
          this.getChapterVideo()
        })
    },
    saveOrUpdateVideo() {
      this.addVideo()
    },

//==============================章节操作====================================
    //删除章节
    removeChapter(chapterId) {
      this.$confirm('此操作将删除章节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击确定，执行then方法
        //调用删除的方法
        classApi.deleteChapter(chapterId)
          .then(response =>{//删除成功
            //提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //刷新页面

            this.getChapterVideo()

          })
      }) //点击取消，执行catch方法
    },
    //修改章节弹框数据回显
    openEditChatper(chapterId) {
      //弹框
      this.dialogChapterFormVisible = true
      //调用接口
      classApi.getChapter(chapterId)
        .then(response => {
          this.chapter = response.data.data
        })
    },
    //弹出添加章节页面
    openChapterDialog() {
      //弹框
      this.dialogChapterFormVisible = true
      //表单数据清空
      this.chapter.title = ''
      this.chapter.year = ''
    },
    //添加章节
    addChapter() {
      classApi.addChapter(this.chapter)
        .then(response => {
          //关闭弹框
          this.dialogChapterFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '添加章节成功!'
          });
          //刷新页面
          this.getChapterVideo()
        })
    },
    //修改章节的方法
    updateChapter() {
      classApi.updateChapter(this.chapter)
        .then(response =>  {
          console.log(this.chapter)
          //关闭弹框
          this.dialogChapterFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '修改章节成功!'
          });
          //刷新页面
          this.getChapterVideo()
          this.chapter.id=''
        })
    },
    saveOrUpdate() {
      console.log(this.chapter.id)
      if(!this.chapter.id) {

        this.addChapter()
      } else {
        this.updateChapter()
       // this.chapter.id=''
      }

    },
    //根据课程id查询章节和小节
    getChapterVideo() {
      classApi.getAllChapterVideo()
        .then(response => {
          this.chapterVideoList = response.data.children
        })
    },
    handleAvatarSuccess(res, file) {
      this.$message({
        type: 'success',
        message: '上传成功!'
      });
      this.chapter.img = res.data.url
      this.$forceUpdate()
    },
    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  }
}
</script>
<style scoped>
.chanpterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>
