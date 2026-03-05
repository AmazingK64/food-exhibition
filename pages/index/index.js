const config = require('../../config.js')

Page({
  data: {
    bannerList: [
      { id: 3, image: 'https://' + config.cloudbaseId + '.tcb.qcloud.la/assets/images/banner3.jpg', title: '厨神进行时' },
      { id: 1, image: 'https://' + config.cloudbaseId + '.tcb.qcloud.la/assets/images/banner1.jpg', title: '菜谱大全' },
      { id: 2, image: 'https://' + config.cloudbaseId + '.tcb.qcloud.la/assets/images/banner2.jpg', title: '特色菜系' },
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
          this.setData({
            featuredFoods: res.result.data || []
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
  }
})
