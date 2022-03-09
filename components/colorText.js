// 　　echo -e “\033[30m 黑色字 \033[0m” 
// 　　echo -e “\033[31m 红色字 \033[0m” 
// 　　echo -e “\033[32m 绿色字 \033[0m” 
// 　　echo -e “\033[33m 黄色字 \033[0m” 
// 　　echo -e “\033[34m 蓝色字 \033[0m” 
// 　　echo -e “\033[35m 紫色字 \033[0m” 
// 　　echo -e “\033[36m 天蓝字 \033[0m” 
// 　　echo -e “\033[37m 白色字 \033[0m” 



function blue(text) {
  return `\x1b[36m ${text} \x1b[0m`
}

function red(text) {
  return `\x1b[31m ${text} \x1b[0m`
}

function green(text) {
  return `\x1b[32m ${text} \x1b[0m`
}


// chalk这个npm也是支持给shell语句标颜色的，但是我们这里尽量不引入第三方包
module.exports = {
  blue,
  red,
  green
}
