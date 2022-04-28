/*
 * @Author: 蒋晓雨
 * @Date: 2022-04-18 17:12:53
 * @LastEditors: 蒋晓雨
 * @LastEditTime: 2022-04-28 10:48:21
 * @FilePath: /jxy-precommit/components/batchCheck.js
 * @Description: 
 * 
 */

function  batchCheck() {

  const fs = require('fs');
  const path = require('path');
  const httpString = require('./httpString')
  const colorText = require('./colorText')


  /**
   *  获取参数，知道要检索的文件夹目录，要避开哪些文件
   */
  let dirLocation
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  readline.question(`你想要检索的文件夹目录?（直接从左侧列表中拖拽文件夹过来就可以哦～）：\n`, location => {
    let dirLocation = location
    if(/\'*\'/.test(location)) {
      location.trim()
      dirLocation = location.slice(1,-1)
    }

    /**获取忽略的文件目录 */
    const gitignorelocation = path.join(dirLocation,'.gitignore')

    if(fs.existsSync(gitignorelocation)) {
      const fileIgnoreList = getFileIgnoreList(gitignorelocation)
      readDir(dirLocation, fileIgnoreList)
    }
    else {
      readDir(dirLocation)
    }

  
    readline.close()


  })


  /**
   *  获取忽略的文件目录
   *  */
  function getFileIgnoreList(gitInnoreLocation) {
    let gitInnoreFileList = [  // 默认的检测cdn时要忽略的文件
      'package.json',
      'yarn.lock',
      'package-lock.json',
      'yarn-error.log',
      '.gitignore',
      '.npmrc',
      'Dockerfile',
      'README.md',
      'readme.md',
      ] 
    if(gitInnoreLocation) {
      const gitInnoreFileContent = fs.readFileSync(gitInnoreLocation,'utf8')
      gitInnoreFileContent.split('\n').forEach((item) => {
        if(!item.startsWith('#')) {
          gitInnoreFileList.push(item.trim())
        }
      })
  
      return gitInnoreFileList
    }
    else {
      return gitInnoreFileList
    }
   
  }

  const ignoreFileTypes = [
    /.*\.md/,
    /.*\.txt/,
    /.*\.png/,
    /.*\.svg/,
  ]

  /**
   * 读取{entry}目录下的所有文件内容并测试是否有违规路径
   * @param {*} entry 
   */
  const readDir = (entry, fileIgnoreList)=>{
    const stat = fs.lstatSync(entry);
    let rootLocationIsFile
    
    if(stat.isFile(entry)) { // 如果是文件
      rootLocationIsFile= true
    }
    else { // 如果是文件夹
      rootLocationIsFile= false
    }

    const  dirInfo = rootLocationIsFile ? [entry] : fs.readdirSync(entry)
    dirInfo.forEach(fileName => {
      if(fileIgnoreList &&
         !(fileIgnoreList.some((item) => item.includes(fileName))) &&
         !(ignoreFileTypes.some((item) => item.test(path.basename(fileName)))) // 不检测特定的文件格式
        ) {
        const location = path.join(entry,fileName)
        const info = fs.statSync(location)
        if(info.isDirectory()){
            readDir(location, fileIgnoreList)
        }else{
            const data = fs.readFileSync(location,'utf8')
            testContent(location, data)
        }
      }

      else if(!fileIgnoreList &&
         rootLocationIsFile &&  // 如果根目录传过来的是个文件，不是文件夹
         !(ignoreFileTypes.some((item) => item.test(path.basename(fileName)))) // 不检测特定的文件格式
      ) { 
        const data = fs.readFileSync(entry,'utf8')
        testContent(entry, data)
      }
     
    })
  }







  /**
     * @description: 
     * @param {*} stdout diff内容字符串
     * @return {*}
     */
    function testContent(filelocation, stdout) {
      
      const contextArr = stdout.split('\n')
      const errorUrlArr = []  // 该文件下的所有违法路径

      contextArr.forEach((item) => {
        if(!item.trim().startsWith('// ')) {
          const assetsUrls = httpString(item)

          const assetsUrl = assetsUrls?assetsUrls[0]:''  // 当前检测文件下，第一个检测到的字符串
          if( assetsUrl 
              && (!assetsUrl.includes('wosai') 
              && !assetsUrl.includes('shouqianba') 
          )) {
            errorUrlArr.push(assetsUrl)
          }
        }
      })


      if(errorUrlArr.length) {
        console.error(`${colorText.red('Error:')} ${colorText.green(filelocation)}文件中`)
      }

      errorUrlArr.forEach((item) => {
        console.error(`${colorText.blue(item)} ${colorText.red('引入三方资源属于违法行为！')}`)
      })

      if(errorUrlArr.length) {
        console.error(`\n`)
      }
    }




  
  

}


module.exports = batchCheck
