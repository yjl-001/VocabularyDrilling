const test = require('node:test')
const assert = require('node:assert/strict')

function createHarness() {
  const storage = new Map()
  let definition
  global.wx = {
    getStorageSync: (key) => storage.get(key),
    setStorageSync: (key, value) => storage.set(key, value),
    navigateTo: () => {}
  }
  global.Page = (page) => { definition = page }
  delete require.cache[require.resolve('../pages/feed/feed')]
  require('../pages/feed/feed')

  function makePage() {
    const page = { ...definition, data: { ...definition.data } }
    page.setData = (changes) => {
      for (const [key, value] of Object.entries(changes)) {
        const match = key.match(/^cards\[(\d+)\]$/)
        if (match) page.data.cards[Number(match[1])] = value
        else page.data[key] = value
      }
    }
    return page
  }
  return { storage, makePage }
}

test('answer, skip, glossary, and local resume work across page instances', () => {
  const { storage, makePage } = createHarness()
  const page = makePage()
  page.onLoad()
  assert.equal(page.data.cards.length, 24)
  assert.equal(page.data.current, 0)

  const first = page.data.cards[0]
  const tappable = first.tokens.find((token) => token.interactive)
  page.onTokenTap({ currentTarget: { dataset: { word: tappable.word, gloss: tappable.gloss, card: first.id } } })
  assert.equal(page.data.tip.word, tappable.word)
  page.closeTip()

  page.onAnswer({ currentTarget: { dataset: { card: first.id, option: first.answerIndex } } })
  assert.equal(page.data.cards[0].correct, true)
  page.onSwiperChange({ detail: { current: 1 } })
  page.onSwiperChange({ detail: { current: 2 } })
  assert.equal(page.data.current, 2)
  const events = storage.get('brush_words_events_v1')
  assert.equal(events.filter((event) => event.type === 'card_skip').length, 1)

  const resumed = makePage()
  resumed.onLoad()
  assert.equal(resumed.data.current, 2)
  assert.equal(resumed.data.cards[0].answered, true)
  assert.equal(resumed.data.cards[0].correct, true)
})
