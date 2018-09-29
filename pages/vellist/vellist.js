// pages/vellist/vellist.js\
const app = getApp();
Page({
  data: {
    carList: [],
    isFix:false,
    belongid:0,
    searchText:'',
    startPage: 0
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: 'XXX公司',
    });
    console.log(options.bid);
    app.httpRequest('veh.php?kind=selectByCom&belongid='+options.bid+'&startpage='+that.data.startPage,function(res){
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
    that.setData({
      startPage:0
    })
    app.httpRequest('veh.php?kind=selectByCom&belongid=' + that.data.belongid + '&startpage=' + that.data.startPage, function (res) {
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
  onReachBottom:function(){
    console.log('上拉');
    var that = this;
    that.setData({
      startPage: that.data.carList.length
    });
    var carList = that.data.carList;
    console.log(carList);
    app.httpRequest('veh.php?kind=selectByCom&belongid=' + that.data.belongid + '&startpage=' + that.data.startPage, function (res) {
      res.data.map(function (item, index) {
        carList.push(item);
      })
      that.setData({
        carList: carList
      })
    });
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
      url: '../../pages/detail/detail?vid=' + currCar.vid + '&belongid=' + currCar.belongid
    })
  }
})