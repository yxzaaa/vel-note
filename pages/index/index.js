//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    isAll:true,
    isFix:false,
    totalVelNum:126,
    topHeight:0,
    searchText:'',
    carList:[]
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '车辆总览',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#47b4c8',
    });
    var query = wx.createSelectorQuery();
    query.select('.top-box').boundingClientRect(function(rect){
      that.setData({
        topHeight:rect.height
      })
    }).exec();
    app.httpRequest('veh.php?kind=selectPay',function(res){
      var carlist = [];
      res.data.map(function(item,index){
        carlist.push(item);
      })
      that.setData({  
        carList:carlist
      })
    });
    app.httpRequest('veh.php?kind=selectAll', function (res) {
      that.setData({
        totalVelNum: res.data.length
      })
    });
  },
  onPageScroll:function(e){
    if (e.scrollTop >= this.data.topHeight){
      this.setData({
        isFix:true
      });
    } else if (e.scrollTop < this.data.topHeight){
      this.setData({
        isFix: false
      });
    }
  },
  onPullDownRefresh:function(){
      this.showAll();
  },
  showAll:function(){
    var that = this;
    app.httpRequest('veh.php?kind=selectPay', function (res) {
      var carlist = [];
      res.data.map(function (item, index) {
        carlist.push(item);
      })
      that.setData({
        carList: carlist,
        isAll:true,
        searchText: ''
      });
      wx.stopPullDownRefresh();
    });
  },
  showLate:function(){
    var that = this;
    app.httpRequest('veh.php?kind=selectLate', function (res) {
      var carlist = [];
      res.data.map(function (item, index) {
        carlist.push(item);
      })
      that.setData({
        carList: carlist,
        isAll:false
      })
    });
  },
  searchVel:function(e){
    var that = this;
    app.httpRequest('veh.php?kind=searchVeh&vnum='+e.detail.value, function (res) {
      console.log(res);
      var carlist = [];
      res.data.map(function (item, index) {
        carlist.push(item);
      })
      if (carlist.length == 0) {
        wx.showToast({
          title: '未找到要搜索的车辆',
          icon: 'none',
          duration: 2000
        })
      }
      that.setData({
        carList: carlist
      })
    });
  },
  toDetail:function(event){
    var currCar = this.data.carList[event.currentTarget.dataset.index];
    console.log(currCar);
    wx.navigateTo({
      url: '../../pages/detail/detail?vnum='+currCar.vnum+'&belongid='+currCar.belongid
    })
  }
})
