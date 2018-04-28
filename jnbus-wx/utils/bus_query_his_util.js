var pubInfo = require("./pub_info.js");

/**
 * 保存:查询历史
 */
var save = function (data) {
  var busQueryHisArr = wx.getStorageSync(pubInfo.storageKey.busQueryHis);
  if (busQueryHisArr == null || busQueryHisArr == "") {
    busQueryHisArr = new Array();
  }

  // 对于已保存的查询历史，不再添加
  var isSave = true;
  for (var index in busQueryHisArr){
    var value = busQueryHisArr[index];
    if (data.lineName == value.lineName && data.startStationName == value.startStationName && data.endStationName == value.endStationName) {
      isSave = false;
      console.log("查询记录已存在，不需要再添加");
      break;
    }
  }
  
  if (isSave) {
    busQueryHisArr.push(data);
    wx.setStorageSync(pubInfo.storageKey.busQueryHis, busQueryHisArr);
  }

}

/**
 * 查询：查询历史
 */
var query = function () {
  return wx.getStorageSync(pubInfo.storageKey.busQueryHis);
}


/**
 * 清楚历史记录
 */
var clear = function () {
  wx.clearStorageSync();
}


module.exports = {
  save: save,
  query: query,
  clear: clear
}
