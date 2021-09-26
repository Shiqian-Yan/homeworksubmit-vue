import request from '@/utils/request'
export default {
  //1 根据课程id获取章节和小节数据列表
  getAllChapterVideo() {
    return request({
      url: '/blogclass/class/getAllClass',
      method: 'get'
    })
  },
  getAllClass(){
    return request({
      url: '/blogclass/class/getClass',
      method: 'get'
    })
  },
  //添加章节
  addChapter(chapter) {
    return request({
      url: '/blogclass/class/addClass',
      method: 'post',
      data: chapter
    })
  },
  //根据id查询章节
  getChapter(chapterId) {
    return request({
      url: '/blogclass/class/findById/'+chapterId,
      method: 'get'
    })
  },
  //修改章节
  updateChapter(chapter) {
    return request({
      url: '/blogclass/class/updateClass',
      method: 'post',
      data: chapter
    })
  },
  //删除章节
  deleteChapter(chapterId) {
    return request({
      url: '/blogclass/class/'+chapterId,
      method: 'delete'
    })
  },
  addSecChapter(parentId,chapter) {
    return request({
      url: '/blogclass/class/addsecClass/'+parentId,
      method: 'post',
      data: chapter
    })
  },
}
