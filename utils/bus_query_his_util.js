var pubInfo = require("./pub_info.js");

/**
 * 保存:查询历史
 */
var save = function (data) {
  console.log(" wx.getStorageSync(pubInfo.storageKey.busQueryHis)" + wx.getStorageSync(pubInfo.storageKey.busQueryHis));
  var busQueryHisArr = wx.getStorageSync(pubInfo.storageKey.busQueryHis);
  if (busQueryHisArr == null || busQueryHisArr == "") {
    busQueryHisArr = new Array();
  }
  busQueryHisArr.push(data);
  wx.setStorageSync(pubInfo.storageKey.busQueryHis, busQueryHisArr);
}

/**
 * 查询：查询历史
 */
var query = function () {
  console.log("query = "+wx.getStorageSync(pubInfo.storageKey.busQueryHis));
  return wx.getStorageSync(pubInfo.storageKey.busQueryHis);
}


/**
 * 清楚历史记录
 */
var clear = function(){
  wx.clearStorageSync();
}


module.exports = {
  save: save,
  query: query,
  clear: clear
}
