import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Launcher } from '@weapp-vite/miniprogram-automator'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const projectPath = path.join(root, 'dist/miniprogram')
const cliPath = process.env.MINIPROGRAM_CLI_PATH || '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'

test('feed renders, accepts an answer, and opens attribution in WeChat DevTools', { timeout: 120_000 }, async () => {
  if (!fs.existsSync(cliPath)) {
    throw new Error(`WeChat DevTools CLI not found at ${cliPath}; set MINIPROGRAM_CLI_PATH`)
  }
  let miniProgram
  try {
    miniProgram = await new Launcher().launch({
      platform: 'wechat',
      cliPath,
      projectPath,
      timeout: 90_000
    })
  } catch (error) {
    throw new Error('Unable to start WeChat DevTools automation. Enable Service Port in Settings → Security Settings, then retry.', { cause: error })
  }
  try {
    const page = await miniProgram.reLaunch('/pages/feed/feed')
    await page.callMethod('restartSample')
    const before = await page.data()
    assert.equal(before.cards.length, 24)
    assert.equal(before.cards[0].answered, false)

    const options = await page.$$('.option-list .option')
    assert.ok(options.length >= 4)
    await options[before.cards[0].answerIndex].tap()
    await page.waitFor(async () => (await page.data()).cards[0].answered)
    const after = await page.data()
    assert.equal(after.cards[0].answered, true)
    assert.equal(after.cards[0].correct, true)

    const sourceLink = await page.$('.source-link')
    assert.ok(sourceLink)
    await sourceLink.tap()
    await page.waitFor(async () => (await miniProgram.currentPage()).path === 'pages/sources/sources')
    const sources = await miniProgram.currentPage()
    assert.equal(sources.path, 'pages/sources/sources')
  } finally {
    await miniProgram.close()
  }
})
