const { CONTENT_VERSION, buildCards } = require('../../lib/feed')

const STORAGE_KEY = 'brush_words_progress_v1'
const EVENTS_KEY = 'brush_words_events_v1'
const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function loadProgress() {
  try {
    const value = wx.getStorageSync(STORAGE_KEY)
    return value && value.version === CONTENT_VERSION ? value : null
  } catch (error) {
    return null
  }
}

function saveProgress(progress) {
  try { wx.setStorageSync(STORAGE_KEY, progress) } catch (error) { /* Storage can be unavailable. */ }
}

function recordEvent(type, details) {
  try {
    const old = wx.getStorageSync(EVENTS_KEY)
    const events = Array.isArray(old) ? old : []
    events.push({ type, sessionId, time: Date.now(), contentVersion: CONTENT_VERSION, ...details })
    wx.setStorageSync(EVENTS_KEY, events.slice(-500))
  } catch (error) { /* Analytics must not block learning. */ }
}

Page({
  data: {
    cards: [],
    current: 0,
    currentDisplay: '01',
    totalDisplay: '24',
    tip: null
  },

  onLoad() {
    const saved = loadProgress() || { answers: {}, viewed: {}, skipped: {}, current: 0 }
    this.progress = saved
    const cards = buildCards(saved.answers || {})
    const current = Math.max(0, Math.min(saved.current || 0, cards.length - 1))
    this.setData({
      cards,
      current,
      currentDisplay: String(current + 1).padStart(2, '0'),
      totalDisplay: String(cards.length).padStart(2, '0')
    })
    recordEvent('session_start', { cardId: cards[current].id })
    this.viewCard(current)
  },

  onHide() { this.persist() },
  onUnload() {
    this.persist()
    recordEvent('session_end', { cardId: this.data.cards[this.data.current].id })
  },

  persist() {
    if (!this.progress) return
    this.progress.version = CONTENT_VERSION
    this.progress.current = this.data.current
    saveProgress(this.progress)
  },

  viewCard(index) {
    const card = this.data.cards[index]
    this.progress.viewed = this.progress.viewed || {}
    if (this.progress.viewed[card.id]) return
    this.progress.viewed[card.id] = true
    recordEvent('card_view', { cardId: card.id, senseId: card.senseId, encounter: card.round })
    this.persist()
  },

  onSwiperChange(event) {
    const next = event.detail.current
    const previous = this.data.current
    if (next === previous) return
    const oldCard = this.data.cards[previous]
    this.progress.skipped = this.progress.skipped || {}
    if (next > previous && !oldCard.answered && !this.progress.skipped[oldCard.id]) {
      this.progress.skipped[oldCard.id] = true
      recordEvent('card_skip', { cardId: oldCard.id, senseId: oldCard.senseId })
    }
    recordEvent('card_leave', { cardId: oldCard.id, direction: next > previous ? 'up' : 'down' })
    this.setData({
      current: next,
      currentDisplay: String(next + 1).padStart(2, '0'),
      tip: null
    })
    this.viewCard(next)
    this.persist()
  },

  onAnswer(event) {
    const cardId = event.currentTarget.dataset.card
    const selected = Number(event.currentTarget.dataset.option)
    const index = this.data.cards.findIndex((card) => card.id === cardId)
    if (index < 0 || this.data.cards[index].answered || !Number.isInteger(selected)) return
    const card = this.data.cards[index]
    card.selected = selected
    card.answered = true
    card.correct = selected === card.answerIndex
    card.options = card.options.map((option) => ({
      ...option,
      state: option.index === card.answerIndex ? 'correct' : option.index === selected ? 'wrong' : 'dim'
    }))
    this.progress.answers = this.progress.answers || {}
    this.progress.answers[cardId] = selected
    this.setData({ [`cards[${index}]`]: card, tip: null })
    this.persist()
    recordEvent('answer_submit', {
      cardId,
      senseId: card.senseId,
      encounter: card.round,
      selected,
      correct: card.correct,
      questionKind: card.questionKind
    })
    recordEvent('feedback_view', { cardId })
  },

  onOptionRowTap(event) {
    const cardId = event.currentTarget.dataset.card
    const card = this.data.cards.find((item) => item.id === cardId)
    if (card && card.questionKind === '中文释义') this.onAnswer(event)
  },

  onTokenTap(event) {
    const { word, gloss, card } = event.currentTarget.dataset
    if (!word || !gloss) return
    this.setData({ tip: { word, gloss } })
    recordEvent('gloss_tap', { cardId: card, word, location: 'sentence' })
  },

  onOptionGloss(event) {
    const { word, gloss, card } = event.currentTarget.dataset
    if (!word || !gloss) return
    this.setData({ tip: { word, gloss } })
    recordEvent('gloss_tap', { cardId: card, word, location: 'option' })
  },

  closeTip() { this.setData({ tip: null }) },
  noOp() {},

  openSources() { wx.navigateTo({ url: '/pages/sources/sources' }) },

  restartSample() {
    this.progress = { answers: {}, viewed: {}, skipped: {}, current: 0 }
    this.setData({ cards: buildCards(), current: 0, currentDisplay: '01', tip: null })
    this.viewCard(0)
    this.persist()
  }
})
