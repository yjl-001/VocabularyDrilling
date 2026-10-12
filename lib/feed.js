const { senses } = require('../content/deck')
const { glosses } = require('../content/glossary')

const CONTENT_VERSION = 'sample-2026-10-11-v1'
const WORD_PATTERN = /([A-Za-z]+|[^A-Za-z]+)/g

function tokenize(sentence, targetWord) {
  return (sentence.match(WORD_PATTERN) || []).map((part, index) => {
    const isWord = /^[A-Za-z]+$/.test(part)
    const key = part.toLowerCase()
    const target = isWord && key === targetWord.toLowerCase()
    return {
      id: index,
      text: part,
      word: isWord ? key : '',
      target,
      interactive: isWord && !target,
      gloss: isWord && !target ? glosses[key] || '' : ''
    }
  })
}

function buildCards(savedAnswers = {}) {
  const cards = []
  for (let round = 0; round < 2; round += 1) {
    senses.forEach((sense) => {
      const rawOptions = round === 0 ? sense.zh : sense.en
      const answerIndex = round === 0 ? sense.zhCorrect : sense.enCorrect
      const id = `${sense.id}-${round + 1}`
      const selected = Number.isInteger(savedAnswers[id]) && savedAnswers[id] >= 0 && savedAnswers[id] < rawOptions.length ? savedAnswers[id] : -1
      cards.push({
        id,
        senseId: sense.id,
        word: sense.word,
        meaning: sense.meaning,
        explanation: sense.explanation,
        sentence: sense.examples[round],
        tokens: tokenize(sense.examples[round], sense.word),
        round: round + 1,
        questionKind: round === 0 ? '中文释义' : '英文近义词',
        answerIndex,
        selected,
        answered: selected >= 0,
        correct: selected === answerIndex,
        options: rawOptions.map((label, index) => ({
          index,
          letter: 'ABCD'[index],
          label,
          gloss: round === 1 ? glosses[label.toLowerCase()] || '' : '',
          state: selected < 0 ? '' : index === answerIndex ? 'correct' : index === selected ? 'wrong' : 'dim'
        }))
      })
    })
  }
  if (cards.length) cards[cards.length - 1].isLast = true
  return cards
}

function validateContent() {
  const problems = []
  const seenIds = new Set()
  senses.forEach((sense) => {
    if (seenIds.has(sense.id)) problems.push(`Duplicate sense: ${sense.id}`)
    seenIds.add(sense.id)
    if (sense.examples.length < 2) problems.push(`Too few examples: ${sense.id}`)
    if (new Set(sense.examples).size !== sense.examples.length) problems.push(`Repeated example: ${sense.id}`)
    ;[['zh', 'zhCorrect'], ['en', 'enCorrect']].forEach(([key, answerKey]) => {
      if (sense[key].length !== 4 || new Set(sense[key]).size !== 4) problems.push(`Invalid options: ${sense.id}/${key}`)
      if (!Number.isInteger(sense[answerKey]) || sense[answerKey] < 0 || sense[answerKey] > 3) problems.push(`Invalid answer: ${sense.id}/${key}`)
    })
    sense.examples.forEach((sentence) => {
      const tokens = tokenize(sentence, sense.word)
      if (tokens.filter((token) => token.target).length !== 1) problems.push(`Target occurrence: ${sense.id}/${sentence}`)
      tokens.filter((token) => token.interactive && !token.gloss).forEach((token) => problems.push(`Missing gloss: ${sense.id}/${token.word}`))
    })
    sense.en.forEach((label) => {
      if (!glosses[label.toLowerCase()]) problems.push(`Missing option gloss: ${sense.id}/${label}`)
    })
  })
  return problems
}

module.exports = { CONTENT_VERSION, buildCards, tokenize, validateContent }
