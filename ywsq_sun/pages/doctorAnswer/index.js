var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    doctor_id: '',
    name: '',
    positionName: '',
    userMessage: '',
    doctorList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.positionName) {
      this.setData({
        positionName: options.positionName,
        userid: options.userid,
        doctor_id: options.doctor_id,
        name: options.name,
      })
      wx.setNavigationBarTitle({
        title: options.positionName + '-' + options.name//页面标题为路由参数
      })
    }
    this.getdoctContent()
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
  getdoctContent() {
    const that = this;
    wx.showLoading()
    app.util.request({
      url: "entry/wxapp/doctor/talking",
      cachetime: "0",
      data: {
        userid: that.data.userid,
        doctor_id: that.data.doctor_id,
      },
      success: function (t) {
        wx.hideLoading()
        1 == t.data.status && that.setData({
          doctorList: t.data.data
        })
      }
    })
  },
  sendInp (e) {
    console.log(e)
    this.setData({
      userMessage: e.detail.value
    })
  },
  postMessage() {
    const that = this;
    // wx.showLoading()
    app.util.request({
      url: "entry/wxapp/doctor/addchat",
      cachetime: "0",
      data: {
        doctor_id: that.data.doctor_id,
        content: that.data.userMessage,
      },
      success: function (t) {
        // wx.hideLoading()
        // console.log(that.data.doctorList)
        if (1 == t.data.status){
          that.data.doctorList.chatlist.push({
            content: that.data.userMessage,
            who: 1
          })
          that.setData({
            doctorList: that.data.doctorList,
            userMessage: "",
          })
        }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})