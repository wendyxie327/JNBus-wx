// pages/bus_detail/detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorMessage: "暂无数据",
    errorContentHide: false,
    busId: "",  // 路程编号
    busLine: "",  // 线路详情
    stations: "", // 线路中站点列表
    maxLineY: 100,
    busCurrentDetails: "",  // 当前正在路上行驶的车辆
    maxIntervalTime: 20, // 刷新间隔时间，单位秒
    lastIntervalTime: 20, // 剩余刷新时间，单位秒
    intervalId: 0, // 定时器ID 
  },

  /**
   * 刷新当前页面
   */
  refreshView: function () {
    this.setData({
      lastIntervalTime: this.data.maxIntervalTime
    });
    this.queryBusStations(this.data.busId);
    this.queryBusCurrentDetail(this.data.busId);
  },

  /**
   * 查询车辆反方向
   */
  searchReverse: function () {
    this.setData({
      busLine: "",
      stations: "", // 各站点列表
      busCurrentDetails: "",
      lastIntervalTime: this.data.maxIntervalTime
    });

    this.queryBusStationsReverse(this.data.busId);
  },

  /**
   * 定时器执行的内部方法
   */
  intervalFunc: function () {
    var lastIntervalTime = this.data.lastIntervalTime;
    if (lastIntervalTime > 0) {
      this.setData({
        lastIntervalTime: lastIntervalTime - 1
      });
    } else {
      this.setData({
        lastIntervalTime: this.data.maxIntervalTime
      });
      this.refreshView();
    }
  },

  /**
   * 开始执行定时器
   */
  beginInterval: function () {
    var id = setInterval(this.intervalFunc, 1000);
    this.setData({
      intervalId: id
    });
  },

  /**
   * 查询站点列表
   */
  queryBusStations: function (busId) {
    var url = app.url.queryBusStations + '/' + busId;
    app.requestBusSimple(url, (res) => {
      if (res.statusCode == 200){
        this.setData({
          busLine: res.data.result,
          stations: res.data.result.stations, // 各站点列表
        });
        this.setErrorContentHide();
        this.drawBusStations();

      }else{
         // 网络异常情况
        this.setErrorContentUnHide("网络异常");
      }
     
    });
  },

// 错误提示隐藏，此时数据正常
  setErrorContentHide(){
    this.setData({
      errorContentHide: true,
    });
  },

  // 显示错误提示
  setErrorContentUnHide(errMsg) {
    this.setData({
      errorContentHide: false,
      errorMessage: errMsg,
    });
  },

  /**
   * 查询正在行驶的车辆详情
   */
  queryBusCurrentDetail: function (busId) {
    var url = app.url.queryBusCurrentDetail + '/' + busId;
    app.requestBusSimple(url, (res) => {
      if(res.statusCode == 200){
        this.setData({
          busCurrentDetails: res.data.result
        });
        
        this.drawBusStations();
        
      }else{
        this.setErrorContentUnHide("网络异常");
      }
     
    });
  },

  /**
   * 查询站点列表 - 反方向
   * 
   * 查询反方向站点列表，并获取到反方向站点名称；再查询相应的正在行驶的车辆名单
   */
  queryBusStationsReverse: function (busId) {
    var url = app.url.queryBusStationsReverse + '/' + busId;
    app.requestBusSimple(url, (res) => {
      if (res.statusCode == 200) {
        this.setData({
          busLine: res.data.result,
          stations: res.data.result.stations, // 各站点列表
          busId: res.data.result.id,
        });
        this.setErrorContentHide();
        // 查询正在行驶的车辆信息
        this.queryBusCurrentDetail(res.data.result.id);

      }else{
        this.setErrorContentUnHide("网络异常");
      }

    });
  },

  /**
   * 绘制线路和车辆
   */
  drawBusStations: function () {
    if (this.data.stations == "" || this.data.busCurrentDetails == "") {
      return;
    }
    var context = wx.createCanvasContext('busContent');
    var greenColor = "#09bb07";
    var lightGreenColor = "#90EE90";
    var yellowColor = "#ffc107";
    var redColor = "#ff5722";
    var arrivedColor = "rgba(63, 81, 181, 1)";
    var arrivingColor = "rgba(63, 81, 181, 0.4)";

    var lineX = 10;
    var lineY = 10;
    var lineMarginHeight = 10;
    var textHeight = 15;

    context.moveTo(lineX, lineY);
    // this.data.busCurrentDetails.push(this.data.busCurrentDetails[0]);
    for (var index = 0; index < this.data.stations.length; index++) {
      var textX = 20;
      // 站点名称显示
      context.setFontSize(14);
      context.fillText((index + 1) + " " + this.data.stations[index].stationName, textX, lineY + lineMarginHeight + textHeight);

      // 车辆信息显示
      var isHaveCurrentBus = false;
      var busNameWidth = 40;

      var num = 0;
      for (var i = 0; i < this.data.busCurrentDetails.length; i++) {

        if (this.data.busCurrentDetails[i].stationSeqNum == this.data.stations[index].id) {
          this.data.busCurrentDetails.
            isHaveCurrentBus = true;
          context.setFontSize(14);
          context.fillText(this.data.busCurrentDetails[i].busId, 10 + textX + num * busNameWidth, lineY + lineMarginHeight + 2 * textHeight);

          // 到达下划线标记
          var arrivedLineX = 10 + textX + num * busNameWidth;
          var arrivedLineY = lineY + lineMarginHeight + 2 * textHeight + 2;
          context.beginPath();
          context.setLineWidth(2);
          context.setStrokeStyle(arrivedColor);
          context.moveTo(arrivedLineX, arrivedLineY);
          if (this.data.busCurrentDetails[i].isArrvLft == "1") {
            // 没到
            context.lineTo(arrivedLineX + busNameWidth / 2, arrivedLineY);
            context.stroke();

            context.beginPath();
            context.setStrokeStyle(arrivingColor);
            context.moveTo(arrivedLineX + busNameWidth / 2, arrivedLineY);
            context.lineTo(arrivedLineX + busNameWidth, arrivedLineY);
            context.stroke();
          } else {
            context.lineTo(arrivedLineX + busNameWidth, arrivedLineY);
            context.stroke();
          }
          num = num + 1;
          textX = textX + 10;

        }
      }

      // 左侧线条
      context.beginPath();
      if (index % 2 == 0) {
        context.setStrokeStyle(greenColor);
      } else {
        context.setStrokeStyle(lightGreenColor);
      }
      context.setLineWidth(5);
      context.moveTo(lineX, lineY);

      if (isHaveCurrentBus) {
        lineY = lineY + 2 * textHeight + 2 * lineMarginHeight;
      } else {
        lineY = lineY + textHeight + 2 * lineMarginHeight;
      }
      context.lineTo(10, lineY);
      context.stroke();

    }
    this.setData({
      maxLineY: lineY + 10
    });

    context.draw();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取从上个页面传来的值
    this.setData({
      busId: options.busId
    });
    this.refreshView();

    // 添加刷新功能
    this.beginInterval();

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
    clearInterval(this.data.intervalId);
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
});

