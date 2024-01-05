import request from '../utils/request.js'

export const publicApi = {
  // 查询当地天气信息  https://api.oioweb.cn/
  weatherInquiry: params => {
    return request({
      url: `https://api.oioweb.cn/api/weather/GetWeather`,
      method: 'get',
      params,
    })
  },
}
