#!/usr/bin/env node
// Simple file-watcher that auto-adds and commits changes on save.
// Usage:
// 1) Install dependency: `npm install --save-dev chokidar`
// 2) Run from project root: `node autocommit.js` (or add an npm script)

const { spawn } = require('child_process')
const debounceMs = 800

let chokidar
try {
  chokidar = require('chokidar')
} catch (err) {
  console.error('Missing dependency: chokidar')
  console.error('Install with: npm install --save-dev chokidar')
  process.exit(1)
}

const cwd = process.cwd()
let timer = null

function runGitCommit() {
  // Check for any changes
  const status = spawn('git', ['status', '--porcelain'], { cwd, stdio: ['ignore', 'pipe', 'inherit'] })
  let out = ''
  status.stdout.on('data', d => (out += d.toString()))
  status.on('close', () => {
    if (!out.trim()) {
      console.log('[autocommit] no changes')
      return
    }

    console.log('[autocommit] changes detected — staging and committing')
    const add = spawn('git', ['add', '-A'], { cwd, stdio: 'inherit' })
    add.on('close', code => {
      const message = `Auto-save: ${new Date().toISOString()}`
      const commit = spawn('git', ['commit', '-m', message], { cwd, stdio: 'inherit' })
      commit.on('close', () => console.log('[autocommit] committed:', message))
    })
  })
}

const watcher = chokidar.watch('.', {
  ignored: /(^|[/\\])\.(git|idea|vscode|env)|node_modules/, // ignore .git, node_modules, IDE folders
  ignoreInitial: true,
  persistent: true,
})

watcher.on('all', (ev, pathChanged) => {
  // Debounce rapid successive saves
  if (timer) clearTimeout(timer)
  timer = setTimeout(runGitCommit, debounceMs)
})

process.on('SIGINT', () => {
  console.log('\n[autocommit] stopping')
  watcher.close().then(() => process.exit(0))
})

console.log('[autocommit] watching for file changes in', cwd)
