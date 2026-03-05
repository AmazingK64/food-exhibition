const app = getApp()

Page({
  data: {
    userInfo: null,
    isAuthorized: false,
    appointments: [],
    favorites: [],
    loading: true,
    activeTab: 'appointments',
    startDate: '',
    endDate: '',
    editingAppointment: null
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        isAuthorized: true
      })
    }
  },

  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        isAuthorized: true
      })
      this.loadAppointments()
      this.loadFavorites()
    } else {
      this.setData({
        userInfo: null,
        isAuthorized: false
      })
    }
  },

  checkAuth() {
    const userInfo = app.globalData.userInfo
    const isAuthorized = app.globalData.isAuthorized
    this.setData({
      userInfo,
      isAuthorized
    })
  },

  onAuthorize() {
    if (this.data.isAuthorized) {
      return
    }
    
    app.getUserProfile((success) => {
      if (success) {
        this.setData({
          userInfo: app.globalData.userInfo,
          isAuthorized: true
        })
        this.loadAppointments()
        this.loadFavorites()
        wx.showToast({ title: '授权成功', icon: 'success' })
      }
    })
  },

  loadAppointments() {
    this.setData({ loading: true })
    const { startDate, endDate } = this.data
    
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { 
        action: 'getAppointments',
        startDate,
        endDate
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            appointments: res.result.data || [],
            loading: false
          })
        }
      },
      fail: (err) => {
        console.error('加载预约记录失败:', err)
        this.setData({ loading: false })
      }
    })
  },

  loadFavorites() {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFavorites' },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            favorites: res.result.data || []
          })
        }
      },
      fail: (err) => {
        console.error('加载收藏失败:', err)
      }
    })
  },

  onTabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  onStartDateChange(e) {
    this.setData({ startDate: e.detail.value })
  },

  onEndDateChange(e) {
    this.setData({ endDate: e.detail.value })
  },

  onFilterConfirm() {
    this.loadAppointments()
  },

  onFilterClear() {
    this.setData({
      startDate: '',
      endDate: ''
    }, () => {
      this.loadAppointments()
    })
  },

  onFoodTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/dish-detail/dish-detail?id=' + id
    })
  },

  onEditTap(e) {
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
      return
    }
    
    const id = e.currentTarget.dataset.id
    const appointment = this.data.appointments.find(a => a._id === id)
    if (appointment) {
      wx.navigateTo({
        url: '/pages/reservation/reservation?id=' + id + '&edit=1'
      })
    }
  },

  onRemoveFavorite(e) {
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
      return
    }
    
    const dishId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'foodApi',
            data: { action: 'removeFavorite', dishId },
            success: (result) => {
              if (result.result.success) {
                wx.showToast({ title: '取消成功', icon: 'success' })
                this.loadFavorites()
              }
            },
            fail: () => {
              wx.showToast({ title: '取消失败', icon: 'none' })
            }
          })
        }
      }
    })
  },

  onCancelTap(e) {
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
      return
    }
    
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消该预约吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'foodApi',
            data: { action: 'cancelAppointment', id },
            success: (result) => {
              if (result.result.success) {
                wx.showToast({ title: '取消成功', icon: 'success' })
                this.loadAppointments()
              }
            },
            fail: () => {
              wx.showToast({ title: '取消失败', icon: 'none' })
            }
          })
        }
      }
    })
  },

  getStatusText(status) {
    const map = {
      pending: '待确认',
      confirmed: '已确认',
      completed: '已完成',
      cancelled: '已取消'
    }
    return map[status] || status
  },

  getStatusClass(status) {
    const map = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    }
    return map[status] || ''
  }
})
