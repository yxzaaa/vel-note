//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    isAll:true,
    isFix:false,
    totalVelNum:0,
    topHeight:0,
    searchText:'',
    carList:[],
    startPage:0
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
    app.httpRequest('veh.php?kind=selectPay&startpage='+that.data.startPage,function(res){
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
    var that = this;
    that.showAll();
    app.httpRequest('veh.php?kind=selectAll', function (res) {
      that.setData({
        totalVelNum: res.data.length
      })
    });
  },
  onReachBottom:function(){
    console.log('上拉');
    var that = this;
    that.setData({
      startPage: that.data.carList.length
    });
    var carList = that.data.carList;
    console.log(carList);
    if(that.data.isAll == true){
      app.httpRequest('veh.php?kind=selectPay&startpage=' + that.data.startPage, function (res) {
        res.data.map(function (item, index) {
          carList.push(item);
        })
        that.setData({
          carList: carList
        })
      });
    }else{
      app.httpRequest('veh.php?kind=selectLate&startpage=' + that.data.startPage, function (res) {
        res.data.map(function (item, index) {
          carList.push(item);
        })
        that.setData({
          carList: carList
        })
      });
    }
  },
  showAll:function(){
    var that = this;
    that.setData({
      startPage: 0
    });
    app.httpRequest('veh.php?kind=selectPay&startpage=' + that.data.startPage, function (res) {
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
    that.setData({
      startPage: 0
    });
    app.httpRequest('veh.php?kind=selectLate&startpage=' + this.data.startPage, function (res) {
      var carlist = [];
      res.data.map(function (item, index) {
        carlist.push(item);
      })
      console.log(carlist);
      that.setData({
        carList: carlist,
        isAll:false
      })
    });
  },
  searchVel:function(){
    var that = this;
    app.httpRequest('veh.php?kind=searchVeh&vnum=' + that.data.searchText, function (res) {
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
      searchText:e.detail.value
    })
  },
  toDetail:function(event){
    var currCar = this.data.carList[event.currentTarget.dataset.index];
    console.log(currCar);
    wx.navigateTo({
      url: '../../pages/detail/detail?vid='+currCar.vid+'&belongid='+currCar.belongid
    })
  }
})
