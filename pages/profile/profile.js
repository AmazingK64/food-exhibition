const app = getApp()

Page({
  data: {
    userInfo: null,
    isAuthorized: false,
    isAdmin: false,
    appointments: [],
    favorites: [],
    loading: true,
    activeTab: 'appointments',
    startDate: '',
    endDate: '',
    editingAppointment: null,
    avatarGenerateCount: 0,
    canGenerateAvatar: true,
    tempNickName: '',
    showSaveBtn: false
  },

  onLoad() {
    this.loadUserInfo()
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
        isAuthorized: false,
        loading: false
      })
    }
  },

  onGetUserInfo(e) {
    if (e.detail.errMsg.indexOf('ok') === -1) {
      wx.showToast({ title: '授权失败', icon: 'none' })
      return
    }
    
    const userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', userInfo)
    
    this.setData({
      userInfo: userInfo,
      isAuthorized: true
    })
    
    this.saveUserToCloud(userInfo)
    
    wx.showLoading({ title: '正在生成头像...' })
    
    const nickName = userInfo.nickName || '用户'
    const prompt = `一个可爱的动漫风格头像，年轻人头像，简约风格，精致五官，${nickName}的头像，清晰面部，干净背景，高质量`
    
    const isAdmin = wx.getStorageSync('isAdmin') || false
    const avatarGenerateCount = wx.getStorageSync('avatarGenerateCount') || 0
    
    wx.cloud.callFunction({
      name: 'generateImage-XuMMNR',
      data: { prompt: prompt },
      success: (res) => {
        const result = res.result
        
        if (result && result.success && result.imageUrl) {
          const newCount = isAdmin ? 0 : avatarGenerateCount + 1
          wx.setStorageSync('avatarGenerateCount', newCount)
          
          this.setData({
            avatarGenerateCount: newCount,
            canGenerateAvatar: isAdmin || newCount < 3
          })
          
          this.updateUserInfo({ avatarUrl: result.imageUrl })
          wx.hideLoading()
          wx.showToast({ title: '授权成功，头像已生成', icon: 'success' })
        } else {
          wx.hideLoading()
          wx.showToast({ title: '授权成功', icon: 'success' })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('生成头像失败:', err)
        wx.showToast({ title: '授权成功', icon: 'success' })
      }
    })
    
    this.loadAppointments()
    this.loadFavorites()
  },

  saveUserToCloud(userInfo) {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: {
        action: 'setUserInfo',
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      },
      success: (res) => {
        console.log('用户信息已保存到云端', res)
      },
      fail: (err) => {
        console.error('保存用户信息到云端失败:', err)
      }
    })
  },

  loadUserInfo() {
    const localUserInfo = wx.getStorageSync('userInfo')
    const avatarGenerateCount = wx.getStorageSync('avatarGenerateCount') || 0
    
    if (localUserInfo) {
      this.setData({
        userInfo: localUserInfo,
        isAuthorized: true,
        avatarGenerateCount: avatarGenerateCount
      })
      
      this.fetchUserFromCloud()
    } else {
      this.setData({
        userInfo: { nickName: '', avatarUrl: '' },
        isAuthorized: false,
        avatarGenerateCount: avatarGenerateCount
      })
    }
  },

  fetchUserFromCloud() {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getUserInfo' },
      success: (res) => {
        const result = res.result
        if (result && result.success && result.data) {
          const cloudUser = result.data
          const isAdmin = cloudUser.isAdmin || false
          
          wx.setStorageSync('isAdmin', isAdmin)
          
          this.setData({
            isAdmin: isAdmin,
            canGenerateAvatar: isAdmin || this.data.avatarGenerateCount < 3
          })
        }
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err)
      }
    })
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
    wx.showToast({
      title: '请点击上方头像按钮授权',
      icon: 'none'
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    if (avatarUrl) {
      this.uploadAvatar(avatarUrl)
    }
  },

  onAvatarTap(e) {
    this.onChooseAvatar(e)
  },

  uploadAvatar(tempFilePath) {
    const app = getApp()
    wx.showLoading({ title: '上传中...' })
    
    const cloudPath = 'avatars/' + (app.globalData.openid || 'unknown') + '/' + Date.now() + '.png'
    
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempFilePath,
      success: (uploadRes) => {
        const fileID = uploadRes.fileID
        this.updateUserInfo({ avatarUrl: fileID })
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({ title: '上传失败', icon: 'none' })
        console.error('上传头像失败:', err)
      }
    })
  },

  onGenerateAvatar() {
    const { isAdmin, avatarGenerateCount, canGenerateAvatar } = this.data
    
    if (!canGenerateAvatar) {
      wx.showToast({ title: '生成次数已用完', icon: 'none' })
      return
    }

    const { userInfo } = this.data
    const nickName = userInfo?.nickName || '用户'
    const prompt = `一个可爱的动漫风格头像，年轻人头像，简约风格，精致五官，${nickName}的头像，清晰面部，干净背景，高质量`

    wx.showLoading({ title: 'AI正在生成头像' })

    wx.cloud.callFunction({
      name: 'generateImage-XuMMNR',
      data: { prompt: prompt },
      success: (res) => {
        wx.hideLoading()
        const result = res.result

        if (result && result.success && result.imageUrl) {
          this.uploadGeneratedAvatar(result.imageUrl)
        } else {
          wx.showToast({ title: result?.message || '生成失败', icon: 'none' })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('生成头像失败:', err)
        wx.showToast({ title: '生成失败，请稍后重试', icon: 'none' })
      }
    })
  },

  uploadGeneratedAvatar(imageUrl) {
    wx.showLoading({ title: '保存中...' })
    
    if (imageUrl && imageUrl.startsWith('http')) {
      const { isAdmin, avatarGenerateCount } = this.data
      const newCount = isAdmin ? 0 : avatarGenerateCount + 1
      
      wx.setStorageSync('avatarGenerateCount', newCount)
      
      this.setData({
        avatarGenerateCount: newCount,
        canGenerateAvatar: isAdmin || newCount < 3
      })
      
      this.updateUserInfo({ avatarUrl: imageUrl })
      wx.hideLoading()
      return
    }
    
    const cloudPath = 'avatars/' + Date.now() + '.png'
    
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: imageUrl,
      success: (uploadRes) => {
        const fileID = uploadRes.fileID
        
        const { isAdmin, avatarGenerateCount } = this.data
        const newCount = isAdmin ? 0 : avatarGenerateCount + 1
        
        wx.setStorageSync('avatarGenerateCount', newCount)
        
        this.setData({
          avatarGenerateCount: newCount,
          canGenerateAvatar: isAdmin || newCount < 3
        })
        
        this.updateUserInfo({ avatarUrl: fileID })
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({ title: '保存失败', icon: 'none' })
        console.error('保存头像失败:', err)
      }
    })
  },

  onNicknameInput(e) {
    const newValue = e.detail.value
    this.setData({
      tempNickName: newValue,
      showSaveBtn: newValue !== (this.data.userInfo.nickName || '')
    })
  },

  onNicknameConfirm() {
    const nickName = this.data.tempNickName || this.data.userInfo.nickName
    if (nickName && nickName.trim()) {
      this.updateUserInfo({ nickName: nickName.trim() })
      this.setData({ 
        tempNickName: '',
        showSaveBtn: false
      })
    }
  },

  updateUserInfo(newInfo) {
    const currentUserInfo = this.data.userInfo
    const updatedUserInfo = { ...currentUserInfo, ...newInfo }
    
    this.setData({ userInfo: updatedUserInfo })
    wx.setStorageSync('userInfo', updatedUserInfo)
    wx.showLoading({ title: '同步中...' })
    
    wx.cloud.callFunction({
      name: 'foodApi',
      data: {
        action: 'setUserInfo',
        nickName: updatedUserInfo.nickName || '',
        avatarUrl: updatedUserInfo.avatarUrl || ''
      },
      success: (res) => {
        wx.hideLoading()
        if (res.result && res.result.success) {
          wx.showToast({ title: '已同步到云端', icon: 'success' })
        } else {
          wx.showToast({ title: '更新成功', icon: 'success' })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('同步用户信息到云端失败:', err)
        wx.showToast({ title: '更新成功', icon: 'success' })
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
  },

  onInitDishData() {
    wx.showLoading({ title: '初始化中...' })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'initData' },
      success: (res) => {
        wx.hideLoading()
        console.log('initData result:', res)
        if (res.result && res.result.success) {
          wx.showToast({
            title: `成功初始化 ${res.result.count} 个菜品`,
            icon: 'success'
          })
        } else {
          wx.showToast({ title: '初始化失败: ' + (res.result?.error || '未知错误'), icon: 'none', duration: 3000 })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('initData fail:', err)
        wx.showToast({ title: '初始化失败: ' + (err.errMsg || '网络错误'), icon: 'none', duration: 3000 })
      }
    })
  },

  onClearData() {
    wx.showModal({
      title: '确认清空',
      content: '将清空所有用户的收藏和预约数据，确定要继续吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '正在清空...' })
          wx.cloud.callFunction({
            name: 'foodApi',
            data: { action: 'clearData' },
            success: (res) => {
              wx.clearStorageSync()
              app.globalData.userInfo = null
              app.globalData.isAuthorized = false
              wx.hideLoading()
              if (res.result.success) {
                wx.showToast({
                  title: `已清空所有数据`,
                  icon: 'success'
                })
                setTimeout(() => {
                  wx.reLaunch({ url: '/pages/index/index' })
                }, 1500)
              } else {
                wx.showToast({ title: '清空失败', icon: 'none' })
              }
            },
            fail: () => {
              wx.hideLoading()
              wx.showToast({ title: '清空失败', icon: 'none' })
            }
          })
        }
      }
    })
  }
})
