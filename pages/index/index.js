const config = require('../../config.js')
// const dishImages = require('../../data/dish-images.js')

Page({
  data: {
    bannerList: [
      { id: 3, image: 'https://' + config.cloudbaseId + '.tcb.qcloud.la/assets/images/banner3.jpg', title: '厨神进行时' },
      { id: 1, image: 'https://' + config.cloudbaseId + '.tcb.qcloud.la/assets/images/banner1.jpg', title: '菜谱大全' },
      // { id: 2, image: 'https://' + config.cloudbaseId + '.tcb.qcloud.la/assets/images/banner2.jpg', title: '特色菜系' },
    ],
    categoryList: ['全部', '川菜', '家常菜', '海鲜', '粤菜', '湘菜'],
    activeCategory: '全部',
    featuredFoods: [],
    loading: true
  },

  onLoad() {
    this.loadFoods()
  },

  onShow() {
    this.setData({ activeCategory: '全部' })
    this.loadFoods()
  },

  loadFoods() {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFoods', featured: true, limit: 6 },
      success: (res) => {
        if (res.result.success) {
          const foods = (res.result.data || []).map(food => {
             if (!food.image || food.image === '') {
               food.image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
             }
             return food
           })
           this.setData({
             featuredFoods: foods
           })
        }
      },
      fail: (err) => {
        console.error('加载菜品失败:', err)
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ activeCategory: category })
    if (category === '全部') {
      this.loadFoods()
    } else {
      this.filterByCategory(category)
    }
  },

  filterByCategory(category) {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFoods', category },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            featuredFoods: res.result.data || []
          })
        }
      },
      fail: (err) => {
        console.error('筛选失败:', err)
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  },

  onFoodTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/dish-detail/dish-detail?id=' + id
    })
  },

  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onMoreTap() {
    wx.switchTab({
      url: '/pages/dishes/dishes'
    })
  },

  onBannerTap(e) {
    const id = e.currentTarget.dataset.id
    if (id === 1) {
      wx.navigateTo({
        url: '/pages/recipe-list/recipe-list'
      })
    } else if (id === 3) {
      wx.navigateTo({
        url: '/pages/chef-list/chef-list'
      })
    } else {
      wx.switchTab({
        url: '/pages/dishes/dishes'
      })
    }
  },

  onUpdateImages() {
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
    
    wx.showLoading({ title: '更新中...' })
    
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFoods', limit: 500 },
      success: (res) => {
        if (res.result.success) {
          const foods = res.result.data || []
          let totalUpdated = 0
          let promises = []
          
          foods.forEach((food) => {
            const imageUrl = dishImages ? dishImages[food.name] : null
            if (imageUrl) {
              totalUpdated++
              promises.push(wx.cloud.callFunction({
                name: 'foodApi',
                data: { 
                  action: 'updateFood', 
                  id: food._id, 
                  image: imageUrl 
                }
              }))
            }
          })
          
          if (promises.length > 0) {
            Promise.all(promises).then(() => {
              wx.hideLoading()
              wx.showToast({
                title: '更新成功！' + totalUpdated + '道菜',
                icon: 'success'
              })
            }).catch((err) => {
              wx.hideLoading()
              wx.showToast({
                title: '更新失败',
                icon: 'none'
              })
              console.error(err)
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '没有需要更新的菜品',
              icon: 'none'
            })
          }
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '获取菜品失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '获取菜品失败',
          icon: 'none'
        })
        console.error('获取菜品失败:', err)
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '美食展览 - 发现更多美味菜谱',
      path: '/pages/index/index'
    }
  }
})
