const config = require('./config.js')

App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: config.envId
      })
    }
    this.checkAuth()
  },

  onShow(options) {
    console.log('App Show', options)
  },

  onHide() {
    console.log('App Hide')
  },

  globalData: {
    userInfo: null,
    isAuthorized: false,
    envId: config.envId
  },

  checkAuth() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isAuthorized = true
    }
  },

  getUserProfile(callback) {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.globalData.userInfo = res.userInfo
        this.globalData.isAuthorized = true
        wx.setStorageSync('userInfo', res.userInfo)
        if (callback) callback(true)
      },
      fail: () => {
        wx.showToast({ title: '授权失败', icon: 'none' })
        if (callback) callback(false)
      }
    })
  },

  checkAndAuthorize(callback) {
    if (this.globalData.isAuthorized) {
      if (callback) callback(true)
      return true
    }
    wx.showModal({
      title: '提示',
      content: '请先授权登录',
      confirmText: '去授权',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/profile/profile'
          })
        }
      }
    })
    return false
  }
})
