<!--
 * @Author: 蒋晓雨
 * @Date: 2022-03-09 11:40:34
 * @LastEditors: 蒋晓雨
 * @LastEditTime: 2022-04-15 15:30:53
 * @FilePath: /jxy-precommit/readme.md
 * @Description: 
 * 
-->
# 项目介绍
用来检测项目中引入的静态资源是否为三方文件，如果不在允许范围内，则报错，打印错误信息，并终止程序

# 项目结构
```
jxy-precommit
├─ components
│  ├─ cdnLinkCheck.js
│  ├─ colorText.js
│  ├─ httpString.js
│  └─ seadEmail.js
├─ demo.js
├─ index.js
├─ package-lock.json
├─ package.json
└─ readme.md

```

# 使用方法
```
yarn add jxy-precommit -D
```


```
npm i jxy-precommit -D
```

在package.json中添加script脚本
```js
npm set-script init "jxyCommitInit" && npm run init
```

```js
"init": "jxyCommitInit"
```

控制台打印出结果：*pre-commit钩子初始化成功！！*

则表示安装成功