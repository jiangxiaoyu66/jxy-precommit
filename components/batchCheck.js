/*
 * @Author: 蒋晓雨
 * @Date: 2022-04-18 17:12:53
 * @LastEditors: 蒋晓雨
 * @LastEditTime: 2022-04-18 20:04:24
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
    if(/\'*\'/.test(location)) {
      location.trim()
      const dirLocation =location.slice(1,-1)
      readDir(dirLocation)
    }


    // readline.question(`你想要避开哪些文件?(直接从左侧列表中拖拽文件夹过来就可以哦～)：\n`, location => {
    //   console.log(`避开 ${location}!`)
    //   dirLocation = location
    //   readline.close()
      

    // })
  })

  /**
   * 读取{entry}目录下的所有文件内容并测试是否有违规路径
   * @param {*} entry 
   */
  const readDir = (entry)=>{
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach(item => {
      if(!item.includes('node_modules') && !item.includes('.git')) {  // 不检索node_modules和.git文件夹
        const location = path.join(entry,item)
        const info = fs.statSync(location)
        if(info.isDirectory()){
            // console.log(`dir: ${location}`)
            readDir(location)
        }else{
            const data = fs.readFileSync(location,'utf8')
            testContent(location, data)
        }
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
        const assetsUrls = httpString(item)
        const assetsUrl = assetsUrls?assetsUrls[0]:''  // 当前检测文件下，第一个检测到的字符串
    
        if(assetsUrl && (!assetsUrl.includes('wosai') && !assetsUrl.includes('shouqianba') )) {
          errorUrlArr.push(assetsUrl)
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
