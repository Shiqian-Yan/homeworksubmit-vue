import request from '@/utils/request'

export default {
  // 1 讲师列表
  getHomeworkListPage(current, limit, blogQuery) {
    return request({
      url: `/teacher/homework/list/${current}/${limit}`,
      method: 'post',
      //requestbody 获取数据
      data: blogQuery //把对象变成json
    })
  },
  deleteHomeworkId(id) {
    return request({
      url: `/teacher/homework/delete/${id}`,
      method: 'delete'
  })
  },
  addHomework(teacher) {
    return request({
      url: `/teacher/homework/add`,
      method: 'post',
      data: teacher,
    })
  },
  getHomeworkInfo(id) {
    return request({
      url: `/teacher/homework/listHomeworkById/${id}`,
      method: 'get'
    })
  },
  updateHomeworkInfo(teacher,id) {
    return request({
      url: `/teacher/homework/update/${id}`,
      method: 'post',
      data:teacher
    })
  },
  download(filename) {
    return request({
      url: `/student/homeworksubmit/download/${filename}`,
      method: 'get',

    })
  },



}

