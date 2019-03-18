'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',   //環境變數，一定要加雙引號"
  API_PATH: '"https://vue-course-api.hexschool.io"',
  CUSTOM_PATH:'"charles"'
})
