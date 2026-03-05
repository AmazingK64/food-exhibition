Page({
  data: {
    keyword: '',
    results: [],
    searching: false,
    history: []
  },

  onLoad() {
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({ history })
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  onSearch() {
    const keyword = this.data.keyword
    if (!keyword.trim()) return

    this.setData({ searching: true })
    
    const history = this.data.history
    if (!history.includes(keyword)) {
      history.unshift(keyword)
      wx.setStorageSync('searchHistory', history.slice(0, 10))
    }

    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'searchFoods', keyword },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            results: res.result.data || [],
            searching: false
          })
        }
      },
      fail: (err) => {
        console.error('搜索失败:', err)
        this.setData({ searching: false })
      }
    })
  },

  onClear() {
    this.setData({ keyword: '', results: [] })
  },

  onHistoryTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ keyword }, () => {
      this.onSearch()
    })
  },

  onFoodTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/dish-detail/dish-detail?id=' + id
    })
  }
})
