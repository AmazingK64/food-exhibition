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

  async onGenerateSteps() {
    const { dish } = this.data
    if (!dish || !dish.name) {
      wx.showToast({ title: '菜品信息加载中', icon: 'none' })
      return
    }

    if (!wx.cloud || !wx.cloud.extend || !wx.cloud.extend.AI) {
      wx.showToast({ title: '当前基础库不支持AI', icon: 'none' })
      return
    }

    wx.showLoading({ title: 'AI生成中...', mask: true })

    try {
      const model = wx.cloud.extend.AI.createModel("hunyuan-exp")
      const prompt = `请为菜品"${dish.name}"生成烹饪步骤。需要考虑以下食材：${(dish.ingredients || []).join('、')}。

请按照以下JSON格式返回烹饪步骤（只需返回JSON，不要其他内容）：
{
  "steps": ["步骤1描述", "步骤2描述", "步骤3描述"],
  "tips": ["小贴士1", "小贴士2"]
}`

      const that = this
      let fullText = ''

      const res = await model.streamText({
        data: {
          model: "hunyuan-turbos-latest",
          messages: [
            { role: "user", content: prompt }
          ]
        }
      })

      for await (let str of res.textStream) {
        fullText += str
      }

      wx.hideLoading()

      const jsonMatch = fullText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        const steps = parsed.steps || []
        if (steps.length > 0) {
          that.setData({
            'dish.steps': steps
          })
          wx.showToast({ title: '生成成功', icon: 'success' })
        } else {
          wx.showToast({ title: '未能生成步骤', icon: 'none' })
        }
      } else {
        const lines = fullText.split('\n').filter(s => s.trim() && s.length > 5)
        if (lines.length > 0) {
          that.setData({
            'dish.steps': lines.slice(0, 10)
          })
          wx.showToast({ title: '生成成功', icon: 'success' })
        } else {
          wx.showToast({ title: '未能生成步骤', icon: 'none' })
        }
      }
    } catch (err) {
      wx.hideLoading()
      console.error('AI生成失败:', err)
      wx.showToast({ title: '生成失败: ' + (err.message || '未知错误'), icon: 'none', duration: 3000 })
    }
  },

  onDeleteImage() {
    if (!this.checkAuthorize()) return
    
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

  onGenerateImage() {
    console.log('AI生成图片按钮点击')
    const { dish, uploading } = this.data
    console.log('dish:', dish)
    console.log('uploading:', uploading)
    
    if (!dish || !dish.name) {
      wx.showToast({ title: '菜品信息加载中', icon: 'none' })
      return
    }
    if (uploading) return

    const prompt = `一道美味的${dish.category || '家常'}菜${dish.name}，详细做法，美食摄影，诱人食欲，高清图片，真实食材，专业厨艺`
    console.log('prompt:', prompt)

    this.setData({ uploading: true })
    wx.showLoading({ title: 'AI 正在生成图片...' })

    wx.cloud.callFunction({
      name: 'generateImage-XuMMNR',
      data: { prompt: prompt },
      success: (res) => {
        console.log('生成成功:', res)
        wx.hideLoading()
        const result = res.result

        if (result && result.success && result.imageUrl) {
          const newImageUrl = result.imageUrl
          const { displayImages } = this.data
          const newImages = [newImageUrl, ...displayImages]
          
          this.updateDishImages(newImages, 0)
          this.setData({ uploading: false })
          wx.showToast({ title: '生成并保存成功！', icon: 'success' })
        } else {
          this.setData({ uploading: false })
          wx.showToast({ title: result?.message || '生成失败', icon: 'none' })
        }
      },
      fail: (err) => {
        console.error('生成图片失败:', err)
        wx.hideLoading()
        this.setData({ uploading: false })
        wx.showToast({ title: '生成失败：' + (err.errMsg || '未知错误'), icon: 'none', duration: 3000 })
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
    if (!this.checkAuthorize()) return
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
