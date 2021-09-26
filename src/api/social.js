import request from '@/utils/request'

export default {
  // 1 讲师列表
  getSocialList() {
    return request({
      url: `/admin/acl/content/listSocial`,
      method: 'get',
    })
  },
  getSocialId(id) {
    return request({
      url: `/admin/acl/content/getSocialInfo/${id}`,
      method: 'get',
    })
  },
  updateSocial(social) {
    return request({
      url: `/admin/acl/content/updateSocial`,
      method: 'post',
      data:social
    })
  },
  addSocial(social) {
    return request({
      url: `/admin/acl/content/addSocial`,
      method: 'post',
      data:social
    })
  },
  deleteSocial(id) {
    return request({
      url: `/admin/acl/content/deleteSocial/${id}`,
      method: 'delete',
    })
  },
}
