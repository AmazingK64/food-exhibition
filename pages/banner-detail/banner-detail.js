Page({
  data: {
    banner: null,
    loading: true
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        banner: {
          id: options.id,
          title: options.title || '活动详情',
          image: options.image || ''
        },
        loading: false
      })
      wx.setNavigationBarTitle({
        title: options.title || '活动详情'
      })
    }
  }
})
