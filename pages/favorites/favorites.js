Page({
  data: {
    favorites: [],
    loading: true,
    isAuthorized: false
  },

  onShow() {
    this.checkAuth()
    this.loadFavorites()
  },

  checkAuth() {
    const isAuthorized = getApp().globalData.isAuthorized
    this.setData({ isAuthorized })
  },

  loadFavorites() {
    this.setData({ loading: true })
    
    const app = getApp()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      this.setData({ loading: false })
      return
    }
    
    wx.cloud.init({
      traceUser: true,
      env: app.globalData.envId
    })

    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFavorites' },
      success: (res) => {
        console.log('收藏数据返回:', res)
        if (res.result.success) {
          this.setData({ 
            favorites: res.result.data || [],
            loading: false
          })
        }
      },
      fail: (err) => {
        console.error('加载收藏失败:', err)
        this.setData({ loading: false })
      }
    })
  },

  onRemoveTap(e) {
    if (!this.checkAuthorize()) return
    
    const dishId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'foodApi',
            data: {
              action: 'removeFavorite',
              dishId: dishId
            },
            success: (res) => {
              if (res.result.success) {
                const favorites = this.data.favorites.filter(item => item.dishId !== dishId)
                this.setData({ favorites })
                wx.showToast({ title: '已取消收藏', icon: 'success' })
              }
            },
            fail: (err) => {
              console.error('取消收藏失败:', err)
            }
          })
        }
      }
    })
  },

  onFoodTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/dish-detail/dish-detail?id=' + id
    })
  },

  checkAuthorize() {
    const app = getApp()
    if (!app.globalData.isAuthorized) {
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
    return true
  }
})
