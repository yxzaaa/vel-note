// pages/group/group.js
const app = getApp();
Page({
  data: {
    groupList:[],
    isFix:false,
    searchText:''
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '公司群组',
    });
    app.httpRequest('com.php?kind=selectAll',function(res){
      var groupList = [];
      res.data.map(function (item, index) {
        groupList.push(item);
      })
      that.setData({
        groupList: groupList
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
    app.httpRequest('com.php?kind=selectAll', function (res) {
      var groupList = [];
      res.data.map(function (item, index) {
        groupList.push(item);
      })
      that.setData({
        groupList: groupList,
        searchText:''
      })
      wx.stopPullDownRefresh();
    })
  },
  searchCom: function (e) {
    var that = this;
    app.httpRequest('com.php?kind=searchCom&bname=' + e.detail.value, function (res) {
      console.log(res);
      var groupList = [];
      res.data.map(function (item, index) {
        groupList.push(item);
      })
      if (groupList.length == 0) {
        wx.showToast({
          title: '未找到要搜索的公司',
          icon: 'none',
          duration: 2000
        })
      }
      that.setData({
        groupList: groupList
      })
    });
  },
  toVelList:function(event){
    console.log(event);
    wx.navigateTo({
      url: '../../pages/vellist/vellist?bid='+event.currentTarget.dataset.bid
    })
  }
})