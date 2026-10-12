const test = require('node:test')
const assert = require('node:assert/strict')
const { senses } = require('../content/deck')
const { buildCards, validateContent } = require('../lib/feed')

test('all sample cards have an unambiguous target, four options, and gloss coverage', () => {
  assert.deepEqual(validateContent(), [])
  const cards = buildCards()
  assert.equal(cards.length, senses.length * 2)
  for (const card of cards) {
    assert.equal(card.options.length, 4)
    assert.equal(card.tokens.filter((token) => token.target).length, 1)
    assert.equal(card.tokens.filter((token) => token.target && token.interactive).length, 0)
    assert.ok(card.tokens.filter((token) => token.interactive).every((token) => token.gloss))
  }
})

test('the next encounter uses a different sentence after ten other cards', () => {
  const cards = buildCards()
  for (const sense of senses) {
    const matches = cards.map((card, index) => ({ card, index })).filter(({ card }) => card.senseId === sense.id)
    assert.equal(matches.length, 2)
    assert.notEqual(matches[0].card.sentence, matches[1].card.sentence)
    assert.equal(matches[1].index - matches[0].index - 1, senses.length - 1)
    assert.ok(matches[1].index - matches[0].index - 1 >= 8)
    assert.ok(matches[1].index - matches[0].index - 1 <= 15)
  }
})

test('saved answers restore feedback without changing card order', () => {
  const original = buildCards()
  const saved = { [original[0].id]: original[0].answerIndex, [original[1].id]: (original[1].answerIndex + 1) % 4 }
  const restored = buildCards(saved)
  assert.equal(restored[0].answered, true)
  assert.equal(restored[0].correct, true)
  assert.equal(restored[1].answered, true)
  assert.equal(restored[1].correct, false)
  assert.equal(restored[2].answered, false)
  assert.equal(restored[0].options.filter((option) => option.state === 'correct').length, 1)
  assert.deepEqual(restored.map((card) => card.id), original.map((card) => card.id))
})
