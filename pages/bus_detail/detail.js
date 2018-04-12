// pages/bus_detail/detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    busLine: "",
    stations: ""
  },

  queryBusLine: function (busId) {
    var url = app.url.queryBusLine + '/' + busId;
    app.requestBusSimple(url, (res) => {
      console.log(res.data);
      this.setData({
        busLine : res.data.result,
        statiosn : res.data.result.stations, // 各站点列表
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryBusLine(options.busId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})