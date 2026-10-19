const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { validateContent } = require('../lib/feed')

const root = path.resolve(__dirname, '..')
const output = path.join(root, 'dist', 'miniprogram')
const files = [
  'app.js', 'app.json', 'app.wxss', 'sitemap.json', 'project.config.json',
  'content/deck.js', 'content/glossary.js', 'lib/feed.js'
]
const directories = ['pages']

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function build() {
  const problems = validateContent()
  if (problems.length) throw new Error(`Content validation failed:\n${problems.join('\n')}`)

  const app = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8'))
  if (!Array.isArray(app.pages) || app.pages.length === 0) {
    throw new Error('app.json must declare at least one page')
  }
  for (const route of app.pages) {
    if (!/^pages\/[a-z0-9/-]+$/.test(route) || route.includes('..')) {
      throw new Error(`Invalid page route: ${route}`)
    }
    for (const extension of ['js', 'json', 'wxml', 'wxss']) {
      const source = path.join(root, `${route}.${extension}`)
      if (!fs.existsSync(source)) throw new Error(`Missing page file: ${route}.${extension}`)
    }
  }

  for (const source of [...files.map((file) => path.join(root, file)), ...directories.flatMap((directory) => walk(path.join(root, directory)))]) {
    if (source.endsWith('.json')) JSON.parse(fs.readFileSync(source, 'utf8'))
    if (source.endsWith('.js')) new vm.Script(fs.readFileSync(source, 'utf8'), { filename: source })
  }

  fs.rmSync(output, { recursive: true, force: true })
  fs.mkdirSync(output, { recursive: true })
  for (const file of files) {
    const destination = path.join(output, file)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.copyFileSync(path.join(root, file), destination)
  }
  for (const directory of directories) {
    fs.cpSync(path.join(root, directory), path.join(output, directory), { recursive: true })
  }
  console.log(`Built Mini Program project: ${output}`)
}

build()
