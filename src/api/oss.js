import request from '@/utils/request'
export default {
  //1 生成统计数据

  uploadFile(file) {
    return request({
      url: `/blogoss/fileoss`,
      method: 'post',
      data:file
    })
  }
}
