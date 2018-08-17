// pages/sim/sim.js
const app = getApp();
Page({
  data: {
    totalSimCount:0,
    simUsed:0,
    simRest:0
  },
  onLoad: function (options) {
    var that = this;
    app.httpRequest('com.php?kind=simTotal', function (res) {
      console.log(res.data[0].simtotal);
      that.setData({
        totalSimCount: res.data[0].simtotal
      });
      app.httpRequest('veh.php?kind=selectAll',function(res){
        console.log(res.data.length);
        that.setData({
          simUsed: res.data.length,
          simRest: that.data.totalSimCount - res.data.length
        });
      })
    })
  },
})