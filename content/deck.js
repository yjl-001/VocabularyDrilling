// Prototype copy is original and must receive a second editorial review before release.
const senses = [
  {
    id: 'durable', word: 'durable', meaning: '耐用的',
    explanation: '东西经得起长时间使用，不容易损坏。',
    examples: [
      'The durable boots lasted through many winters.',
      'A durable bag can carry heavy books for years.'
    ],
    zh: ['脆弱的', '耐用的', '匆忙的', '罕见的'], zhCorrect: 1,
    en: ['fragile', 'lasting', 'hesitant', 'scarce'], enCorrect: 1
  },
  {
    id: 'subtle', word: 'subtle', meaning: '细微的；不明显的',
    explanation: '变化或味道存在，却不容易立刻察觉。',
    examples: [
      'A subtle change in his voice showed that he was upset.',
      'The soup had a subtle taste of lemon.'
    ],
    zh: ['明显的', '细微的', '苦涩的', '突然的'], zhCorrect: 1,
    en: ['obvious', 'slight', 'rough', 'loud'], enCorrect: 1
  },
  {
    id: 'scarce', word: 'scarce', meaning: '稀缺的；不足的',
    explanation: '这里表示所需的东西数量不够。',
    examples: [
      'Clean water was scarce after the long dry season.',
      'Jobs were scarce in the small town.'
    ],
    zh: ['充足的', '昂贵的', '稀缺的', '普通的'], zhCorrect: 2,
    en: ['common', 'rare', 'steady', 'clear'], enCorrect: 1
  },
  {
    id: 'feasible', word: 'feasible', meaning: '可行的',
    explanation: '计划或做法在现实条件下能够完成。',
    examples: [
      'The plan looked feasible with only three steps.',
      'A daily walk is feasible even on busy days.'
    ],
    zh: ['可行的', '复杂的', '昂贵的', '临时的'], zhCorrect: 0,
    en: ['distant', 'possible', 'risky', 'difficult'], enCorrect: 1
  },
  {
    id: 'reluctant', word: 'reluctant', meaning: '不情愿的',
    explanation: '行动或同意之前有明显的犹豫。',
    examples: [
      'He was reluctant to leave the warm room for the rain.',
      'She gave a reluctant yes after a long pause.'
    ],
    zh: ['兴奋的', '不情愿的', '谨慎的', '疲惫的'], zhCorrect: 1,
    en: ['eager', 'unwilling', 'certain', 'polite'], enCorrect: 1
  },
  {
    id: 'coherent', word: 'coherent', meaning: '连贯的；有条理的',
    explanation: '叙述前后连接清楚，容易理解。',
    examples: [
      'Her story was coherent, so everyone understood what happened.',
      'He made a coherent argument from start to finish.'
    ],
    zh: ['简短的', '连贯的', '夸张的', '模糊的'], zhCorrect: 1,
    en: ['logical', 'scattered', 'brief', 'gentle'], enCorrect: 0
  },
  {
    id: 'ambiguous', word: 'ambiguous', meaning: '含糊不清的；有歧义的',
    explanation: '表达可以有不止一种理解，因此让人无法确定意思。',
    examples: [
      'The sign was ambiguous, so drivers turned both ways.',
      'His answer was ambiguous; I could not tell if he agreed.'
    ],
    zh: ['准确的', '熟悉的', '含糊不清的', '严肃的'], zhCorrect: 2,
    en: ['exact', 'unclear', 'familiar', 'simple'], enCorrect: 1
  },
  {
    id: 'sustain', word: 'sustain', meaning: '维持；支撑',
    explanation: '这里表示提供条件，让事物得以继续。',
    examples: [
      'The farm needs rain to sustain its crops.',
      'Small donations sustain the local library.'
    ],
    zh: ['发现', '削减', '维持', '修复'], zhCorrect: 2,
    en: ['reduce', 'maintain', 'repair', 'discover'], enCorrect: 1
  },
  {
    id: 'deteriorate', word: 'deteriorate', meaning: '恶化；变差',
    explanation: '状态随着时间变得更糟。',
    examples: [
      'Without repairs, the old bridge began to deteriorate.',
      'His health began to deteriorate after the winter.'
    ],
    zh: ['改善', '停留', '恶化', '消失'], zhCorrect: 2,
    en: ['recover', 'worsen', 'improve', 'remain'], enCorrect: 1
  },
  {
    id: 'alleviate', word: 'alleviate', meaning: '缓解；减轻',
    explanation: '让疼痛或问题变得不那么严重。',
    examples: [
      'A short rest helped alleviate her headache.',
      'New buses may alleviate traffic in the city.'
    ],
    zh: ['加重', '缓解', '测量', '忽略'], zhCorrect: 1,
    en: ['increase', 'ease', 'measure', 'ignore'], enCorrect: 1
  },
  {
    id: 'inevitable', word: 'inevitable', meaning: '不可避免的',
    explanation: '根据眼前情况，事情看来一定会发生。',
    examples: [
      'With dark clouds above us, rain seemed inevitable.',
      'After years of wear, repairs to the old roof were inevitable.'
    ],
    zh: ['短暂的', '可选择的', '不可避免的', '突然的'], zhCorrect: 2,
    en: ['optional', 'unavoidable', 'sudden', 'temporary'], enCorrect: 1
  },
  {
    id: 'concise', word: 'concise', meaning: '简洁的；简明的',
    explanation: '用少量文字清楚地表达主要内容。',
    examples: [
      'Her concise email covered the main point in two lines.',
      'The guide was concise, so I read it in a minute.'
    ],
    zh: ['详细的', '含糊的', '简洁的', '正式的'], zhCorrect: 2,
    en: ['vague', 'brief', 'detailed', 'slow'], enCorrect: 1
  }
]

module.exports = { senses }
