const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const built = path.resolve(__dirname, '../../dist/miniprogram')

function loadPage(route, storage, navigation) {
  let definition
  global.wx = {
    getStorageSync: (key) => storage.get(key),
    setStorageSync: (key, value) => storage.set(key, value),
    navigateTo: ({ url }) => navigation.push(url),
    setClipboardData: ({ data }) => navigation.push(`copied:${data}`)
  }
  global.Page = (page) => { definition = page }
  const pageFile = path.join(built, `${route}.js`)
  delete require.cache[require.resolve(pageFile)]
  require(pageFile)
  return {
    ...definition,
    data: structuredClone(definition.data),
    setData(changes) {
      for (const [key, value] of Object.entries(changes)) {
        const match = key.match(/^cards\[(\d+)\]$/)
        if (match) this.data.cards[Number(match[1])] = value
        else this.data[key] = value
      }
    }
  }
}

test('built project supports answering, resume, navigation, and source attribution', () => {
  assert.ok(fs.existsSync(path.join(built, 'project.config.json')))
  const routes = JSON.parse(fs.readFileSync(path.join(built, 'app.json'), 'utf8')).pages
  assert.deepEqual(routes, ['pages/feed/feed', 'pages/sources/sources'])

  const storage = new Map()
  const navigation = []
  const feed = loadPage(routes[0], storage, navigation)
  feed.onLoad()
  assert.equal(feed.data.cards.length, 24)
  const first = feed.data.cards[0]
  feed.onOptionRowTap({ currentTarget: { dataset: { card: first.id, option: first.answerIndex } } })
  assert.equal(feed.data.cards[0].correct, true)
  feed.onSwiperChange({ detail: { current: 1 } })
  feed.openSources()
  assert.deepEqual(navigation, ['/pages/sources/sources'])

  const sources = loadPage(routes[1], storage, navigation)
  sources.copyLink({ currentTarget: { dataset: { url: 'https://github.com/skywind3000/ECDICT' } } })
  assert.equal(navigation[1], 'copied:https://github.com/skywind3000/ECDICT')

  const resumed = loadPage(routes[0], storage, navigation)
  resumed.onLoad()
  assert.equal(resumed.data.current, 1)
  assert.equal(resumed.data.cards[0].correct, true)
})
