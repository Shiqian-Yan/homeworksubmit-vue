import request from '@/utils/request'

export default {
  // 1 讲师列表
  getBlogListPage(current, limit, blogQuery) {
    return request({
      url: `/admin/acl/content/list/${current}/${limit}`,
      method: 'post',
      //requestbody 获取数据
      data: blogQuery //把对象变成json
    })
  },
  deleteBlogId(id) {
    return request({
      url: `/admin/acl/content/delete/${id}`,
      method: 'delete'
    })
  },
  addBlog(teacher) {
    return request({
      url: `/admin/acl/content/add`,
      method: 'post',
      data: teacher,
    })
  },
  getBlogInfo(id) {
    return request({
      url: `/admin/acl/content/listBlogById/${id}`,
      method: 'get'
    })
  },
  updateBlogInfo(teacher,id) {
    return request({
      url: `/admin/acl/content/update/${id}`,
      method: 'post',
      data:teacher
    })
  },



}

