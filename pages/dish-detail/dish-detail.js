Page({
  data: {
    dish: null,
    loading: true,
    favorited: false,
    uploading: false,
    isAuthorized: false,
    displayImages: [],
    currentImageIndex: 0
  },

  onLoad(options) {
    this.initCloud()
    this.checkAuth()
    const id = options.id
    if (id) {
      this.loadDish(id)
      this.checkFavoriteStatus(id)
    }
  },

  checkFavoriteStatus(id) {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'checkFavorite', dishId: id },
      success: (res) => {
        if (res.result.success) {
          this.setData({ favorited: res.result.favorited })
        }
      },
      fail: (err) => {
        console.error('检查收藏状态失败:', err)
      }
    })
  },

  onChangeImage() {
    const { displayImages, currentImageIndex } = this.data
    const nextIndex = (currentImageIndex + 1) % displayImages.length
    this.setData({ currentImageIndex: nextIndex })
  },

  onImageChange(e) {
    this.setData({ currentImageIndex: e.detail.current })
  },

  onReplaceImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.replaceImage(tempFilePath)
      }
    })
  },

  replaceImage(filePath) {
    this.setData({ uploading: true })
    wx.showLoading({ title: '上传中...' })

    const { currentImageIndex, displayImages, dish } = this.data
    const cloudPath = 'foods/' + dish._id + '/cover_' + Date.now() + '.jpg'
    const envId = getApp().globalData.envId

    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
      env: envId,
      success: (res) => {
        const fileID = res.fileID
        const newImages = [...displayImages]
        newImages[currentImageIndex] = fileID
        this.updateDishImages(newImages)
      },
      fail: (err) => {
        console.error('上传失败:', err)
        wx.hideLoading()
        wx.showToast({ 
          title: '上传失败: ' + (err.errMsg || '权限不足'), 
          icon: 'none',
          duration: 3000
        })
        this.setData({ uploading: false })
      }
    })
  },

  onDeleteImage() {
    const { currentImageIndex, displayImages, dish } = this.data
    if (displayImages.length <= 1) {
      wx.showToast({ title: '至少保留一张图片', icon: 'none' })
      return
    }

    wx.showModal({
      title: '确认删除',
      content: '确定要删除当前图片吗？',
      success: (res) => {
        if (res.confirm) {
          const newImages = displayImages.filter((_, index) => index !== currentImageIndex)
          this.updateDishImages(newImages, currentImageIndex > 0 ? currentImageIndex - 1 : 0)
        }
      }
    })
  },

  updateDishImages(images, newIndex = 0) {
    const { dish } = this.data
    wx.cloud.callFunction({
      name: 'foodApi',
      data: {
        action: 'updateFood',
        id: dish._id,
        image: images[0],
        images: images
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            displayImages: images,
            currentImageIndex: newIndex,
            'dish.image': images[0],
            'dish.images': images,
            uploading: false
          })
          wx.showToast({ title: '更新成功', icon: 'success' })
        } else {
          wx.showToast({ title: '更新失败', icon: 'none' })
          this.setData({ uploading: false })
        }
      },
      fail: (err) => {
        console.error('更新失败:', err)
        wx.showToast({ title: '更新失败', icon: 'none' })
        this.setData({ uploading: false })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  initCloud() {
    const app = getApp()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: app.globalData.envId
      })
    }
  },

  checkAuth() {
    const isAuthorized = getApp().globalData.isAuthorized
    this.setData({ isAuthorized })
  },

  loadDish(id) {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFood', id },
      success: (res) => {
        if (res.result.success) {
          const dish = res.result.data
          const hasImages = dish.images && Array.isArray(dish.images) && dish.images.length > 0
          const images = hasImages ? dish.images : [dish.image]
          this.setData({
            dish: dish,
            displayImages: images,
            currentImageIndex: 0,
            loading: false
          })
          wx.setNavigationBarTitle({
            title: dish ? dish.name : '菜品详情'
          })
        }
      },
      fail: (err) => {
        console.error('加载菜品失败:', err)
        this.setData({ loading: false })
      }
    })
  },

  onUploadImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.uploadImage(tempFilePath)
      }
    })
  },

  uploadImage(filePath) {
    this.setData({ uploading: true })
    wx.showLoading({ title: '上传中...' })

    const cloudPath = 'foods/' + this.data.dish._id + '/cover_' + Date.now() + '.jpg'
    const envId = getApp().globalData.envId

    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
      env: envId,
      success: (res) => {
        const fileID = res.fileID
        this.updateDishImage(fileID)
      },
      fail: (err) => {
        console.error('上传失败:', err)
        wx.hideLoading()
        wx.showToast({ 
          title: '上传失败: ' + (err.errMsg || '权限不足'), 
          icon: 'none',
          duration: 3000
        })
        this.setData({ uploading: false })
      }
    })
  },

  updateDishImage(imageUrl) {
    const { dish, displayImages } = this.data
    const images = dish.images && dish.images.length > 0 ? [...dish.images, imageUrl] : [imageUrl]
    
    wx.cloud.callFunction({
      name: 'foodApi',
      data: {
        action: 'updateFood',
        id: this.data.dish._id,
        image: displayImages[0],
        images: images
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            'dish.image': displayImages[0],
            'dish.images': images,
            displayImages: images,
            uploading: false
          })
          wx.showToast({ title: '更新成功', icon: 'success' })
        } else {
          wx.showToast({ title: '更新失败', icon: 'none' })
          this.setData({ uploading: false })
        }
      },
      fail: (err) => {
        console.error('更新失败:', err)
        wx.showToast({ title: '更新失败', icon: 'none' })
        this.setData({ uploading: false })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  onReserveTap() {
    if (!this.checkAuthorize()) return
    if (!this.data.dish) return
    wx.navigateTo({
      url: '/pages/reservation/reservation?id=' + this.data.dish._id + '&name=' + this.data.dish.name
    })
  },

  onFavoriteTap() {
    console.log('收藏按钮点击', this.data.favorited, getApp().globalData.isAuthorized)
    
    if (!this.checkAuthorize()) {
      console.log('未授权，不能收藏')
      return
    }
    
    this.setData({ favorited: !this.data.favorited })
    
    const dish = this.data.dish
    console.log('收藏操作:', this.data.favorited ? 'addFavorite' : 'removeFavorite', 'dishId:', dish._id)
    
    wx.cloud.callFunction({
      name: 'foodApi',
      data: {
        action: this.data.favorited ? 'addFavorite' : 'removeFavorite',
        dishId: dish._id,
        dishName: dish.name,
        dishImage: dish.image,
        dishPrice: dish.price
      },
      success: (res) => {
        console.log('收藏云函数返回:', res)
        if (res.result.success) {
          wx.showToast({
            title: this.data.favorited ? '收藏成功' : '取消收藏',
            icon: 'success'
          })
        } else {
          console.error('收藏失败:', res.result.error)
          wx.showToast({ title: res.result.error || '操作失败', icon: 'none' })
        }
      },
      fail: (err) => {
        console.error('收藏失败:', err)
        this.setData({ favorited: !this.data.favorited })
        wx.showToast({ title: '操作失败', icon: 'none' })
      }
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
  },

  onShareAppMessage() {
    return {
      title: this.data.dish ? this.data.dish.name : '菜品分享',
      path: '/pages/dish-detail/dish-detail?id=' + (this.data.dish ? this.data.dish._id : '')
    }
  }
})
