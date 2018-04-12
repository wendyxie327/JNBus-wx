// pages/search/search.js
var busQueryHisUtil = require("../../utils/bus_query_his_util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    busList: [],
    errorMessage: "暂无数据",
    errorContentHide: false,
    inputShowed: false,
    inputVal: ""
  },

  /**
    * 设置Data中的goodsList数据
    */
  setBusListData: function (list, errMsg) {
    if (list == null || list.length == 0 || !(list instanceof Array)) {
      this.setData({
        errorMessage: errMsg,
        errorContentHide: false
      });
    } else {
      this.setData({
        busList: list,
        errorContentHide: true
      });
    }
  },

  /**
   * 显示保存的历史查询数据
   */
  queryBusListHis: function () {
    this.setBusListData(busQueryHisUtil.query(), "请搜索需要查询的车辆");
  },

  /**
   * 联网查询-根据输入框内容
   */
  queryBusList: function (bus) {
    if (bus != null && bus != "") {
      var url = app.url.queryBusList + '/' + bus + '/0/20';

      app.requestBus(url, null, (res) => {
        console.log(res);
        this.setBusListData(res.data.result.result, "换个查询条件试试");
      });
    }
  },



  /**
   * 监听输入内容：
   *  模糊查询菜名
   */
  searchInputListener: function (e) {
    console.log(e.detail.value);
    this.queryBusList(e.detail.value);
  },

  /**
   * 显示详情页面
   */
  showDetailView: function (event) {
    console.log(event);
    console.log(event.currentTarget.dataset);
    busQueryHisUtil.save(event.currentTarget.dataset);

    wx.navigateTo({
      url: '../bus_detail/detail'
    })
  },

  /**
   * 清空搜索历史
   */
  clearBusQueryHis: function (event) {
    busQueryHisUtil.clear();
    this.queryBusListHis();
  },

  /**
   * 显示搜索框
   */
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  /**
   * 取消显示搜索框
   */
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.queryBusListHis();
  },

  /**
   * 清空搜索框中内容
   */
  clearInput: function () {
    this.setData({
      inputVal: "",
    });
    this.queryBusListHis();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryBusListHis();
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