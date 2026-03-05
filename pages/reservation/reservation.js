Page({
  data: {
    dishId: '',
    dishName: '',
    isEdit: false,
    appointmentId: '',
    selectedDishes: [],
    selectedDishIds: [],
    allDishes: [],
    showDishPicker: false,
    userName: '',
    visitDate: '',
    time: '',
    note: '',
    times: ['11:00', '12:00', '17:00', '18:00', '19:00', '20:00'],
    submitting: false,
    isAuthorized: false
  },

  onLoad(options) {
    this.checkAuth()
    
    const today = this.getToday()
    this.setData({ visitDate: today })
    
    if (options.id) {
      if (options.edit === '1') {
        this.setData({
          appointmentId: options.id,
          isEdit: true
        })
        this.loadAppointment(options.id)
      } else {
        const dishId = options.id
        const dishName = options.name || ''
        if (dishId) {
          this.setData({
            selectedDishes: [{ id: dishId, name: dishName }],
            selectedDishIds: [dishId]
          })
        }
      }
    }
    
    this.loadAllDishes()
  },

  checkAuth() {
    const isAuthorized = getApp().globalData.isAuthorized
    this.setData({ isAuthorized })
  },

  getToday() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  loadAppointment(id) {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getAppointmentById', id },
      success: (res) => {
        if (res.result.success && res.result.data) {
          const appt = res.result.data
          this.setData({
            appointmentId: appt._id,
            userName: appt.userName || '',
            visitDate: appt.visitDate || '',
            time: appt.time || '',
            note: appt.note || '',
            selectedDishIds: appt.dishIds || [],
            selectedDishes: (appt.dishNames || []).map((name, index) => ({
              id: (appt.dishIds || [])[index] || '',
              name: name
            }))
          })
        }
      },
      fail: (err) => {
        console.error('加载预约失败:', err)
      }
    })
  },

  loadAllDishes() {
    wx.cloud.callFunction({
      name: 'foodApi',
      data: { action: 'getFoods' },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            allDishes: res.result.data || []
          })
        }
      },
      fail: (err) => {
        console.error('加载菜品失败:', err)
      }
    })
  },

  onNameInput(e) {
    this.setData({ userName: e.detail.value })
  },

  onDateInput(e) {
    this.setData({ visitDate: e.detail.value })
  },

  onTimeSelect(e) {
    this.setData({ time: e.currentTarget.dataset.time })
  },

  onNoteInput(e) {
    this.setData({ note: e.detail.value })
  },

  onAddDish() {
    console.log('打开弹窗，selectedDishIds:', this.data.selectedDishIds)
    console.log('allDishes:', this.data.allDishes)
    this.setData({ showDishPicker: true })
  },

  onCloseDishPicker() {
    this.setData({ showDishPicker: false })
  },

  onToggleDish(e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    let { selectedDishIds, selectedDishes } = this.data
    
    if (selectedDishIds.includes(id)) {
      const idx = selectedDishIds.indexOf(id)
      selectedDishIds = selectedDishIds.filter((_, i) => i !== idx)
      selectedDishes = selectedDishes.filter((_, i) => i !== idx)
    } else {
      selectedDishIds = [...selectedDishIds, id]
      selectedDishes = [...selectedDishes, { id, name }]
    }
    
    this.setData({
      selectedDishIds,
      selectedDishes
    })
  },

  onConfirmDishPicker() {
    const { allDishes, selectedDishIds } = this.data
    const selectedDishes = selectedDishIds.map(id => {
      const dish = allDishes.find(d => d._id === id)
      return dish ? { id: dish._id, name: dish.name, image: dish.image, ingredients: dish.ingredients || [] } : null
    }).filter(Boolean)
    
    this.setData({ 
      showDishPicker: false,
      selectedDishes
    })
  },

  onRemoveDish(e) {
    const index = e.currentTarget.dataset.index
    let { selectedDishIds, selectedDishes } = this.data
    selectedDishIds = selectedDishIds.filter((_, i) => i !== index)
    selectedDishes = selectedDishes.filter((_, i) => i !== index)
    this.setData({
      selectedDishIds,
      selectedDishes
    })
  },

  onSubmit() {
    if (!this.checkAuthorize()) return

    const { selectedDishes, selectedDishIds, userName, visitDate, time, isEdit, appointmentId } = this.data
    
    if (selectedDishIds.length === 0) {
      wx.showToast({
        title: '请选择至少一个菜品',
        icon: 'none'
      })
      return
    }
    
    if (!userName || !visitDate || !time) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    this.setData({ submitting: true })

    const dishNames = selectedDishes.map(d => d.name)
    
    if (isEdit) {
      wx.cloud.callFunction({
        name: 'foodApi',
        data: {
          action: 'updateAppointment',
          id: appointmentId,
          dishIds: selectedDishIds,
          dishNames: dishNames,
          dishes: selectedDishes,
          userName,
          visitDate,
          time,
          note: this.data.note
        },
        success: (res) => {
          if (res.result.success) {
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          }
        },
        fail: () => {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        },
        complete: () => {
          this.setData({ submitting: false })
        }
      })
    } else {
      wx.cloud.callFunction({
        name: 'foodApi',
        data: {
          action: 'createAppointment',
          dishIds: selectedDishIds,
          dishNames: dishNames,
          dishes: selectedDishes,
          userName,
          visitDate,
          time,
          note: this.data.note
        },
        success: (res) => {
          if (res.result.success) {
            wx.showToast({
              title: '预约成功',
              icon: 'success'
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          }
        },
        fail: () => {
          wx.showToast({
            title: '预约失败',
            icon: 'none'
          })
        },
        complete: () => {
          this.setData({ submitting: false })
        }
      })
    }
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
  }
})
