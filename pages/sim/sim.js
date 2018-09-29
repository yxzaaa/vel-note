// pages/sim/sim.js
const app = getApp();
Page({
  data: {
    totalSimRest:0,
    simData:[],
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'SIM卡管理',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#47b4c8',
    });
    var that = this;
    app.httpRequest('simadmin.php?kind=totalsimrest', function (res) {
      console.log(res.data);
      var totalAdd = 0;
      var totalUse = 0;
      res.data.msg.map(function(item,index){
        totalAdd += item.addnum;
        totalUse += item.usenum;
      });
      that.setData({
        simData:res.data.msg,
        totalSimRest:totalAdd - totalUse
      })
    })
  },
  onPullDownRefresh: function () {
      wx.stopPullDownRefresh();
  },
})