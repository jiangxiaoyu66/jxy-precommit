const {spawn, exec} = require('child_process')
const {writeFile,createWriteStream,readFile,readFileSync} = require('fs')
const {green} = require('./components/colorText')


// 获得hooks的目录
 function getDirectory () {
  const data = readFileSync('./.git/config','utf8')
  // const a = data.match(/(?<=hooksPath)\w/g)
  const contentArr = data.split('\n')
  let directory='./.git/hooks' // 默认路径为.git/hooks
  for(let item of contentArr){
    if(item.includes('hooksPath')) {
      const index= item.indexOf('=')
      let result = item.substr(index + 1).trim()
      directory = result
      break
    }
  }
  return directory
}

const directory = getDirectory()



// 在钩子目录中插入对应的钩子脚本
exec('touch pre-commit',({cwd: directory}),(err, stdout, stderr) => {
  /**
   * tips：
      写入文件不存在，会自动创建文件并写入内容。
      写入文件存在，会先清空原文件内容，重新写入新的内容。
   */
  var stream = createWriteStream(`${directory}/pre-commit`);
  stream.write(
`#!/usr/bin/env node
console.log('${green('pre-commit钩子已启动！！')}')
const {cdnLinkCheck} = require('jxy-precommit')

cdnLinkCheck()
`)
console.log(green('pre-commit钩子初始化成功！！'))
});




  
  






