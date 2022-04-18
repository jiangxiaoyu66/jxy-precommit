const {spawn, exec} = require('child_process')
const {writeFile,createWriteStream,readFile,readFileSync, exists, writeFileSync} = require('fs')
const {green,red} = require('./components/colorText')


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
const precommitDirectory = directory+'/pre-commit'


// 要写入的代码块
const nodeCode = `// 检测cdn是否合规的相关脚本
console.log('${green('pre-commit钩子已启动！！')}')
const {cdnLinkCheck} = require('jxy-precommit')

cdnLinkCheck()
`
// node环境声明的代码
const nodeEnvDeclare = '#!/usr/bin/env node'


exists(precommitDirectory, (ifexists) => {
  // 如果文件已经存在，则在原有代码后新增内容
  if(ifexists) {
    // 原来的内容
    const data = readFileSync(precommitDirectory,'utf8')

    if(data==='') {
      writeFileSync(precommitDirectory, nodeEnvDeclare+'\n'+nodeCode, 'utf8')
    }
    else if(data.includes(nodeCode)) {
      console.log(red('您已经初始化过一次啦！'));
    }
    else {
      writeFileSync(precommitDirectory, data+'\n'+nodeCode, 'utf8')
    }

  }

  // 如果文件不存在存在，会自动创建文件并写入内容。
  else {
    // 在钩子目录中插入对应的钩子脚本
    exec('touch pre-commit',({cwd: directory}),(err, stdout, stderr) => {

      /**
       * tips：
          写入文件不存在，会自动创建文件并写入内容。
          写入文件存在，会先清空原文件内容，重新写入新的内容。
      */
      var stream = createWriteStream(`${directory}/pre-commit`);
      stream.write(nodeEnvDeclare+'\n'+nodeCode)
    console.log(green('pre-commit钩子初始化成功！！'))
    });

  }
})






  
  






