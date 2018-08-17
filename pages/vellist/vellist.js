// pages/vellist/vellist.js\
const app = getApp();
Page({
  data: {
    carList: [],
    isFix:false,
    belongid:0,
    searchText:''
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: 'XXX公司',
    });
    console.log(options.bid);
    app.httpRequest('veh.php?kind=selectByCom&belongid='+options.bid,function(res){
      var carlist = [];
      res.data.map(function (item, index) {
        carlist.push(item);
      })
      that.setData({
        carList: carlist,
        belongid:options.bid
      })
    })
  },
  onPageScroll: function (e) {
    if (e.scrollTop > 0) {
      this.setData({
        isFix: true
      })
    } else if (e.scrollTop <= 0) {
      this.setData({
        isFix: false
      })
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    app.httpRequest('veh.php?kind=selectByCom&belongid=' + this.data.belongid, function (res) {
      var carList = [];
      res.data.map(function (item, index) {
        carList.push(item);
      })
      that.setData({
        carList: carList,
        searchText:''
      })
      wx.stopPullDownRefresh();
    })
  },
  searchVel: function () {
    var that = this;
    app.httpRequest('veh.php?kind=searchVehByCom&vnum=' + that.data.searchText +'&belongid='+that.data.belongid, function (res) {
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
  setText: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  toDetail: function (event) {
    var currCar = this.data.carList[event.currentTarget.dataset.index];
    console.log(currCar);
    wx.navigateTo({
      url: '../../pages/detail/detail?vnum=' + currCar.vnum + '&belongid=' + currCar.belongid
    })
  }
})