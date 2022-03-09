 /**
  * @description: 检测cdn链接是否有上传到公司内部oss上
  * @return {*}
  */
function cdnLinkCheck() {
  const colorText = require('./colorText')
  const httpString = require('./httpString')
  const exec = require('child_process').exec

  const command = 'git diff --staged'

  // 这里也可以通过shelljs（三方npm包）执行shell脚本，但没必要
  exec(command, 'utf8', (err, stdout, stderr) => {
    if (err) {
      console.log('err:', err)
      console.log('stderr:', stderr)
    } else {
      testContent(stdout)
    }
  })

  /**
   * @description: 
   * @param {*} stdout diff内容字符串
   * @return {*}
   */
  function testContent(stdout) {
    const contextArr = stdout.split('\n')
    let fileName
    contextArr.forEach((item) => {
      if(item && item.startsWith('+++')) {
        fileName = item.slice(6)+':' // 当前检测的文件名
      }
      if(item && item.startsWith('+') && !item.startsWith('+++') && !item.startsWith('+//') ) {
        const assetsUrls = httpString(item)
        const assetsUrl = assetsUrls?assetsUrls[0]:''  // 当前检测文件下，第一个检测到的字符串
    
        if(assetsUrl && (!assetsUrl.includes('wosai') && !assetsUrl.includes('shouqianba') )) {
          console.error(`${colorText.red('Error:')}  
${colorText.green(fileName)} ${colorText.blue(assetsUrl)} ${colorText.red('引入三方资源属于违法行为！')}`)
          process.exit(1)
        }
      }
    })

  }

}

module.exports =cdnLinkCheck