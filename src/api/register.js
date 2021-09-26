import request from '@/utils/request'
export default {
  //1 生成统计数据

  registerUser(user) {
    return request({
      url: `serviceregister/acluser/register`,
      method: 'post',
      data:user
    })
  },
  getAllRole() {
    return request({
      url: `/serviceregister/aclrole/allRole`,
      method: 'get',

    })
  },
  add(addVo) {
    return request({
      url: `/serviceregister/acluserrole/add`,
      method: 'post',
      data: addVo

    })
  },
}
