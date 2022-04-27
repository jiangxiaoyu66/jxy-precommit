#!/usr/bin/env node

require('../init.js') // 执行初始化

/**
 * 插入检查所有文件cdn的链接
 */
const exec = require('child_process').exec
const command = 'npm set-script checkCdn "checkCdn"'
exec(command)

/**
 * 激活githooks使其生效
 *  */ 
exec('chmod 700 .git/hooks/*', 'utf8', (err, stdout, stderr) => {
  if (err) {
    console.log('err:', err)
    console.log('stderr:', stderr)
  } else {
    console.log(`\x1b[32m 已激活githooks \x1b[0m`);
  }
})