Page({
  data: {
    id: '',
    title: '',
    content: [],
    loading: true
  },

  onLoad(options) {
    const id = options.id || ''
    const title = decodeURIComponent(options.title || '')
    wx.setNavigationBarTitle({ title: title })
    
    this.setData({ id, title })
    this.loadContent(id)
  },

  parseContent(text) {
    const lines = text.split('\n')
    const result = []
    let currentItem = null

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        if (currentItem) result.push(currentItem)
        currentItem = { type: 'h2', text: line.replace('## ', '') }
      } else if (line.startsWith('### ')) {
        if (currentItem) result.push(currentItem)
        currentItem = { type: 'h3', text: line.replace('### ', '') }
      } else if (line.startsWith('- ')) {
        if (currentItem && currentItem.type === 'ul') {
          currentItem.items.push(line.replace('- ', ''))
        } else {
          if (currentItem) result.push(currentItem)
          currentItem = { type: 'ul', items: [line.replace('- ', '')] }
        }
      } else if (line.trim() === '') {
        if (currentItem) result.push(currentItem)
        currentItem = null
      } else if (line.match(/^\d+\./)) {
        if (currentItem && currentItem.type === 'ol') {
          currentItem.items.push(line)
        } else {
          if (currentItem) result.push(currentItem)
          currentItem = { type: 'ol', items: [line] }
        }
      } else {
        if (currentItem) result.push(currentItem)
        currentItem = { type: 'p', text: line }
      }
    })
    if (currentItem) result.push(currentItem)
    return result
  },

  loadContent(id) {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getChefDetail', id: id },
      success: (res) => {
        if (res.result && res.result.data) {
          const content = res.result.data.content || '暂无内容'
          const parsedContent = this.parseContent(content)
          this.setData({
            title: res.result.data.title || '',
            content: parsedContent,
            loading: false
          })
        } else {
          this.setData({
            content: [{ type: 'p', text: '暂无内容' }],
            loading: false
          })
        }
      },
      fail: (err) => {
        console.error('加载内容失败:', err)
        this.setData({
          content: [{ type: 'p', text: '加载失败，请稍后重试' }],
          loading: false
        })
      }
    })
  }
})
