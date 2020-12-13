// pages/userInfo/clublist/clublist.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 'join',
    infoList: {
      join: [],
      setup: [],
    },
    idList: {
      join: [],
      setup: [],
    },
    loaded: false,
  },
  tabSelect: function(e){
    this.setData({
      tabCur: e.currentTarget.dataset.cur
    })
  },
  tapBtnClub: function(e){
    wx.navigateTo({
      url: '../../index/index?CurPage=playground',
    })
  },
  tapSetup: function(e){
    wx.navigateTo({
      url: '/pages/playground/signup/signup'
    })
  },
  tapClub: function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/playground/frontPage/frontPage?club_id=' + this.data.idList[this.data.tabCur][index],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let obj = JSON.parse(options.obj)
    let join_id = obj.join
    let setup_id = obj.setup
    let join = []
    let setup = []
    let cnt1 = 0
    let cnt2 = 0
    let length1 = join_id.length
    let length2 = setup_id.length
    if(length1 == 0 && length2 == 0)
    {
      _this.setData({
        loaded: true,
      })
    }
    for (let id of join_id){
      app.getClubInfo(id, res => {
        join.push(res.data)
        cnt1 += 1
        if(cnt1 == length1 && cnt2 == length2){
          _this.setData({
            infoList:{
              join: join,
              setup: setup,
            },
            idList: {
              join: join_id,
              setup: setup_id,
            },
            loaded: true,
          })
        }
      })
    }
    for (let id of setup_id){
      app.getClubInfo(id, res => {
        setup.push(res.data)
        cnt2 += 1
        if(cnt1 == length1 && cnt2 == length2){
          _this.setData({
            infoList:{
              join: join,
              setup: setup,
            },
            idList: {
              join: join_id,
              setup: setup_id,
            },
            loaded: true,
          })
        }
      })
    }
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