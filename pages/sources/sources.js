Page({
  copyLink(event) {
    wx.setClipboardData({ data: event.currentTarget.dataset.url })
  }
})
