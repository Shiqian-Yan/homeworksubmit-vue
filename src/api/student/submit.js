import request from '@/utils/request'
export default {
  //1 生成统计数据

  getSubmitHomeworkListPage(current, limit) {
    return request({
      url: `/student/homeworksubmit/list/${current}/${limit}`,
      method: 'post',

    })
  },
  getAllSubmitHomeworkListPage(current, limit,blogQuery) {
    return request({
      url: `/student/homeworksubmit/listAll/${current}/${limit}`,
      method: 'post',
      //requestbody 获取数据
      data: blogQuery //把对象变成json

    })
  },
  deleteSubmitHomeworkId(id){
    return request({
      url: `/student/homeworksubmit/delete/${id}`,
      method: 'delete'
    })
  }
}
