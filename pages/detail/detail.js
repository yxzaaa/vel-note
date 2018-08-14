// pages/detail/detail.js
const app = getApp();
Page({
  data: {
    carDetail:{}
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '京A12345',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#47b4c8',
    });
    console.log(options);
    app.httpRequest('veh.php?kind=selectByVeh&vnum='+options.vnum+'&belongid='+options.belongid,function(res){
      console.log(res.data);
      that.setData({
        carDetail:res.data[0]
      })
    })
  }
})