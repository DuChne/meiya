var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorList: [],
    p: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdoctContent();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getdoctContent () {
    const that = this;
    console.log(that.data.p)
    app.util.request({
      url: "entry/wxapp/doctor/list",
      cachetime: "0",
      data: {
        p: that.data.p,
      },
      success: function (t) {
        if (1 == t.data.status && t.data.data.length==0) return wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        1 == t.data.status&&that.setData({
          doctorList: that.data.doctorList.concat(t.data.data)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  goRecord () {
    wx.navigateTo({
      url: '../consultationRecord/index',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(123)
    this.setData({
      p: this.data.p + 1
    });
    this.getdoctContent();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})