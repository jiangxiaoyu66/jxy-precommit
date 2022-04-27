const fs = require('fs');

const readmecontent = fs.readFileSync('./README.md', 'utf-8')

const txtToAdd =
`
# 触发cdncheck，检测项目中是否有使用到非内部oss管理的静态资源链接
触发方式：
执行 'npm run cdnCheckInit' (执行一次即可，后面该项目下所有commit操作之前都会检查提交代码中的链接是否合规)

`

if(!readmecontent.includes(txtToAdd)) {
  fs.writeFileSync('./README.md', readmecontent + '\n' + txtToAdd)
}
