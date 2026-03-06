Page({
  data: {
    categoryList: [],
    foods: [],
    filteredFoods: [],
    activeCategory: '全部',
    loading: true,
    isAdmin: false
  },

  onLoad() {
    this.loadCategories()
    this.loadFoods()
    this.fetchUserInfo()
  },

  fetchUserInfo() {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getUserInfo' },
      success: (res) => {
        const result = res.result
        if (result && result.success && result.data) {
          const isAdmin = result.data.isAdmin || false
          wx.setStorageSync('isAdmin', isAdmin)
          this.setData({ isAdmin: isAdmin })
        }
      },
      fail: (err) => {
        const isAdmin = wx.getStorageSync('isAdmin') || false
        this.setData({ isAdmin: isAdmin })
      }
    })
  },

  onShow() {
    this.loadFoods()
  },

  loadCategories() {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getCategories' },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            categoryList: res.result.data || ['全部']
          })
        }
      },
      fail: (err) => {
        console.error('加载分类失败:', err)
        this.setData({ categoryList: ['全部'] })
      }
    })
  },

  loadFoods() {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFoods' },
      success: (res) => {
        if (res.result.success) {
          const foods = res.result.data || []
          this.setData({
            foods,
            loading: false
          })
          this.filterFoods()
        }
      },
      fail: (err) => {
        console.error('加载菜品失败:', err)
        this.setData({ loading: false })
      }
    })
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ activeCategory: category })
    this.filterFoods()
  },

  filterFoods() {
    const { foods, activeCategory } = this.data
    let filtered = foods
    
    if (activeCategory !== '全部') {
      filtered = foods.filter(item => item.category === activeCategory)
    }
    
    this.setData({ filteredFoods: filtered })
  },

  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onFoodTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/dish-detail/dish-detail?id=' + id
    })
  },

  onAddToCart(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/reservation/reservation?id=' + item._id + '&name=' + item.name
    })
  }
})
