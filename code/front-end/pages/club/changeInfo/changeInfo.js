// pages/userInfo/authorization/authorization.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImgList: [],
    contactImgList: [],
    displayImgList: [],
    name: undefined,
    description: undefined,
  },
  ChooseImage(e) {
    let count = undefined
    let imgList = []
    let target = e.currentTarget.dataset.cur
    if(target == 'display'){
      count = 9
      imgList = this.data.displayImgList
    }
    else if(target == 'cover'){
      count = 1
      imgList = this.data.coverImgList
    }
    else{
      count = 1
      imgList = this.data.contactImgList
    }
    wx.chooseImage({
      count: count, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (imgList.length != 0) {
          this.setData({
            [target + 'ImgList']: imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            [target + 'ImgList']: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    let cur = e.currentTarget.dataset.cur
    let imgList = []
    if(cur == 'display'){
      imgList = this.data.displayImgList
    }
    else if(cur == 'cover'){
      imgList = this.data.coverImgList
    }
    else{
      imgList = this.data.contactImgList
    }
    wx.previewImage({
      urls: imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    let cur = e.currentTarget.dataset.cur
    let imgList = []
    let index = e.currentTarget.dataset.index
    if(cur == 'display'){
      imgList = this.data.displayImgList
    }
    else if(cur == 'cover'){
      imgList = this.data.coverImgList
    }
    else{
      imgList = this.data.contactImgList
    }
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          imgList.splice(index, 1);
          this.setData({
            [cur + 'ImgList']: imgList
          })
        }
      }
    })
  },
  editInput: function(e){
    if(e.currentTarget.dataset.cur == 'name'){
      this.setData({
        name:e.detail.value
      })
    }
    else if(e.currentTarget.dataset.cur == 'description'){
      this.setData({
        description: e.detail.value
      })
    }
  },
  tapCommit: function(){
    console.log({
      name: this.data.name,
      description:this.data.description,
      presidentOpenid: app.globalData.openid,
      coverImg: this.data.coverImgList,
      contactImg: this.data.coverImgList,
      displayImgList: this.data.displayImgList,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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