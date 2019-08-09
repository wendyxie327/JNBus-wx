//app.js
var httpUrl = 'https://bus.wujiatong.cn/BusConversion';

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },


  url: {
    // 济南公交原IP地址 60.216.101.229
    // updateAPP: 'http://jinan.iwaybook.com/download/update.json',
    // getIp: 'http://www.iwaybook.com/server-ue2/rest/servers-v2/370100',
    // queryBusList: 'http://iwaybook.369cx.cn' + '/server-ue2/rest/buslines/simple/370100',
    // queryBusCurrentDetail: 'http://iwaybook.369cx.cn' + '/server-ue2/rest/buses/busline/370100',
    // queryBusStations: 'http://iwaybook.369cx.cn' + '/server-ue2/rest/buslines/370100',
    // queryBusStationsReverse: 'http://iwaybook.369cx.cn' + '/server-ue2/rest/buslines/theOtherDirection/370100',

    queryBusList: httpUrl + '/restful/conversion/queryBusList',
    queryBusCurrentDetail: httpUrl + '/restful/conversion/queryBusCurrentDetail',
    queryBusStations: httpUrl + '/restful/conversion/queryBusStations',
    queryBusStationsReverse: httpUrl + '/restful/conversion/queryBusStationsReverse',
  },


  requestBus: function (url, data, successFunction) {
    return wx.request({
      url: url,
      data: data,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'version': 'android-insigma.waybook.jinan-2366'
      },
      success: successFunction
    })
  },

  requestBusSimple: function (url, successFunction) {
    return this.requestBus(url, null, successFunction);
  }
})