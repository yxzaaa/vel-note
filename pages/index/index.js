//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isAll:true,
    isFix:false,
    totalVelNum:126,
    topHeight:0,
    carList:[],
    currList:[]
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
    wx.request({
      url: 'http://lgkj.chuangkegf.com/vels.php',
      data:{},
      method:'POST',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data);
        var carList = [];
        for(var i=0;i<res.data.length;i++){
          carList.push({
            velNum:res.data[i].vNum,
            noNum:res.data[i].vSpeed,
            isLate:false
          })
        }
        that.setData({
          carList:carList
        })
      }
    })
  },
  onPageScroll:function(e){
    if (e.scrollTop >= this.data.topHeight){
      this.setData({
        isFix:true
      })
    } else if (e.scrollTop < this.data.topHeight){
      this.setData({
        isFix: false
      })
    }
  },
  showAll:function(){
    var currList = this.data.carList;
    this.setData({
      currList: currList,
      isAll:true
    });
  },
  showLate:function(){
    var carList = this.data.carList;
    var currList = [];
    for(var i=0;i<carList.length;i++){
      if(carList[i].isLate == true){
        currList.push(carList[i]);
      }
    }
    this.setData({
      currList: currList,
      isAll: false
    });
  },
  searchVel:function(e){
    var carList = this.data.carList;
    var currList = [];
    for (var i = 0; i < carList.length; i++) {
      if (carList[i].velNum == e.detail.value) {
        currList.push(carList[i]);
      }
    }
    if(currList.length == 0){
      currList = carList;
      wx.showToast({
        title: '未找到要搜索的车辆',
        icon:'none',
        duration:2000
      })
    }
    this.setData({
      currList: currList
    });
  },
  toDetail:function(){
    wx.navigateTo({
      url: '../../pages/detail/detail'
    })
  }
})
