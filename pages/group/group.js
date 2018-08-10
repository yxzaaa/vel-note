// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList:[
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:true
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
      {
        comName:'XXX公司',
        totalNoPay:'115.5',
        hasLate:false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '公司群组',
    });
  },
  toVelList:function(){
    wx.navigateTo({
      url: '../../pages/vellist/vellist'
    })
  }
})