'use strict'

const fs = require('fs')
const path = require('path')
const pug = require('pug')

const SRC = path.join(__dirname, 'src')
const INJECT = path.join(SRC, 'inject.js')
const inject = String(fs.readFileSync(INJECT))

fs.writeFileSync(INJECT, inject.replace(/^ *const overlay = .+$/m, `const overlay = ${JSON.stringify(pug.renderFile(path.join(SRC, 'overlay.pug')))};`))
