Page({
  data: {
    tipsList: [],
    loading: true
  },

  onLoad() {
    this.loadChefList()
  },

  loadChefList() {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getChefList' },
      success: (res) => {
        if (res.result && res.result.data) {
          const iconMap = {
            'kitchen': '🍳',
            'choose': '🤔',
            'taboo': '⚠️',
            'pressure': '🔥',
            'airfryer': '🫕',
            'deodorize': '🐟',
            'safety': '🛡️',
            'microwave': '📻',
            'blanch': '💧',
            'stirfry': '🥘',
            'cold': '🥗',
            'marinate': '🧂',
            'steam': '🥢',
            'boil': '🍲'
          }
          const tipsList = res.result.data.map(item => ({
            ...item,
            icon: iconMap[item.chefId] || '📖'
          }))
          this.setData({
            tipsList: tipsList,
            loading: false
          })
        } else {
          this.setData({ loading: false })
        }
      },
      fail: (err) => {
        console.error('加载失败:', err)
        this.setData({ loading: false })
      }
    })
  },

  onTipTap(e) {
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/chef-detail/chef-detail?id=' + id + '&title=' + encodeURIComponent(title)
    })
  }
})
