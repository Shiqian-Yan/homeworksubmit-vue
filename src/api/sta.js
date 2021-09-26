import request from '@/utils/request'
export default {
    //1 生成统计数据
    createStaData(day) {
        return request({
            url: '/staservice/sta/registerCount/'+day,
            method: 'post'
          })
    },
    //2 获取统计数据
    getDataSta() {
        return request({
            url: `/admin/acl/content/getNumber`,
            method: 'get'
          })
    }
}
