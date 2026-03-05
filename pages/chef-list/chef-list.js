Page({
  data: {
    tipsList: [
      { id: 'kitchen', title: '厨房准备', icon: '🍳' },
      { id: 'choose', title: '如何选择现在吃什么', icon: '🤔' },
      { id: 'taboo', title: '食材相克与禁忌', icon: '⚠️' },
      { id: 'pressure', title: '高压力锅', icon: '🔥' },
      { id: 'airfryer', title: '空气炸锅', icon: '🫕' },
      { id: 'deodorize', title: '去腥', icon: '🐟' },
      { id: 'safety', title: '食品安全', icon: '🛡️' },
      { id: 'microwave', title: '微波炉', icon: '📻' },
      { id: 'blanch', title: '学习焯水', icon: '💧' },
      { id: 'stirfry', title: '学习炒与煎', icon: '🥘' },
      { id: 'cold', title: '学习凉拌', icon: '🥗' },
      { id: 'marinate', title: '学习腌', icon: '🧂' },
      { id: 'steam', title: '学习蒸', icon: '🥢' },
      { id: 'boil', title: '学习煮', icon: '🍲' }
    ]
  },

  onTipTap(e) {
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/chef-detail/chef-detail?id=' + id + '&title=' + encodeURIComponent(title)
    })
  }
})
