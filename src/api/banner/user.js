import request from '@/utils/request'
export default {
  //1 生成统计数据
  updateUser(user) {
    return request({
      url: '/admin/acl/content/updateUser',
      method: 'post',
      data:user
    })
  },
  //2 获取统计数据
  updateBanner(banner) {
    return request({
      url: `/admin/acl/content/updateBanner`,
      method: 'post',
      data:banner
    })
  }
}
