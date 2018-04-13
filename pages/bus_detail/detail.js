// pages/bus_detail/detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    busLine: "",  // 线路详情
    stations: "", // 线路中站点列表
    maxLineY: 100,
    busCurrentDetails: ""  // 当前正在路上行驶的车辆
  },

  /**
   * 查询站点列表
   */
  queryBusStations: function (busId) {
    var url = app.url.queryBusStations + '/' + busId;
    app.requestBusSimple(url, (res) => {
      console.log(res.data);
      this.setData({
        busLine: res.data.result,
        stations: res.data.result.stations, // 各站点列表
      });
      this.drawBusStations();
    });
  },

  /**
   * 查询正在行驶的车辆详情
   */
  queryBusCurrentDetail: function (busId) {
    var url = app.url.queryBusCurrentDetail + '/' + busId;
    app.requestBusSimple(url, (res) => {
      console.log(res.data);
      this.setData({
        busCurrentDetails: res.data.result
      });
      this.drawBusStations();
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
      context.fillText(index + " " + this.data.stations[index].stationName, textX, lineY + lineMarginHeight + textHeight);

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
        context.setStrokeStyle(yellowColor);
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
    // this.queryBusLine(options.busId); // 获取从上个页面传来的值
    this.queryBusStations(options.busId);
    this.queryBusCurrentDetail(options.busId);
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