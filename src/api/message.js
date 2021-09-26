import request from '@/utils/request'

export default {
  // 1 讲师列表
  getMessageListPage(current, limit) {
    return request({
      url: `/admin/acl/content/listMessage/${current}/${limit}`,
      method: 'get',
    })
  },
  getReplyId(id) {
    return request({
      url: `/admin/acl/content/reply/${id}`,
      method: 'get',
    })
  }
}
