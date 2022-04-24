#!/usr/bin/env node

require('../init.js') // 执行初始化

/**
 * 插入检查所有文件cdn的链接
 */
const exec = require('child_process').exec
const command = 'npm set-script checkCdn "checkCdn"'
exec(command)