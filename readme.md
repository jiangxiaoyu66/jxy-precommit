检测项目中引入的静态资源是否为三方文件，如果不在允许范围内，则报错，打印错误信息，并终止程序
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

## 一、安装
`yarn add @wosai/cdncheck -D`

或者

`npm i @wosai/cdncheck -D`

## 二、初始化
在package.json中添加script脚本

如果你**本地开发环境npm版本在7或7以上**，则执行以下代码语句即可自动在package.json插入脚本语句

`
npm set-script cdnCheckInit "cdnCheckInit" && npm run cdnCheckInit
`

如果你**本地开发环境npm版本在7以下**，则需要手动在package.json插入如下script命令：

```js
  "cdnCheckInit": "cdnCheckInit",
  "checkCdn": "checkCdn"
```

然后执行：`npm run cdnCheckInit`






## 三、主要功能使用
### 1、检测指定目录下文件中用到的静态资源是否使用的外部资源链接

#### 使用方法：
`npm run checkCdn`

会在终端看到打印输出所有 检测存在问题的文件和对应的问题链接。找到问题链接后需要手动将此三方静态文件上传到公司内部sso，并将三方链接替换为公司内部链接

**注意**：

如果输入的文件目录中检测到.gitignore文件，则在检测cdn是否合法时，会**自动忽略.gitignore中配置**的文件
如果输入的文件目录中没有检测到.gitignore文件，则默认会检查改目录下的**所有文件**

**默认不检查这几个文件**：
'package.json',
'yarn.lock',
'package-lock.json',
'yarn-error.log',
'.gitignore',
'.npmrc',
'Dockerfile',
'README.md',

**默认不检查这以下格式的文件**：md,txt文件;png，svg文件


### 2、在提交之前自动检查所有暂存区的文件，如果有问题则会中断提交，并报出存在问题的文件和对应的链接。直到修复，则可以正常提交

**注意**：
关于检测出来的链接依旧想提交的情况
在commit后加上`--no-verify`进行忽略就可



## 注意
记得更新Readme.md，添加如下描述，供后面开发者使用：
> ## 启动cdn自动检测
> `npm run cdnCheckInit`



