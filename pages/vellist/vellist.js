// pages/vellist/vellist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: true
      },
      {
        velNum: '京B32422',
        noNum: '12.6',
        isLate: false
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: true
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: false
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: true
      },
      {
        velNum: '京B32422',
        noNum: '12.6',
        isLate: false
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: true
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: false
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: true
      },
      {
        velNum: '京B32422',
        noNum: '12.6',
        isLate: false
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: true
      },
      {
        velNum: '京A12345',
        noNum: '32.4',
        isLate: false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'XXX公司',
    });
  },
  toDetail: function () {
    wx.navigateTo({
      url: '../../pages/detail/detail'
    })
  }
})