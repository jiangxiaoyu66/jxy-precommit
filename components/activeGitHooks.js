/**
 * 激活githooks使其生效
 *  */ 
function activeGitHooks() {
  const exec = require('child_process').exec

  exec('chmod 700 .git/hooks/*', 'utf8', (err, stdout, stderr) => {
    if (err) {
      console.log('err:', err)
      console.log('stderr:', stderr)
    } else {
      console.log(`\x1b[32m 已激活githooks \x1b[0m`);
    }
  })
}

module.exports = activeGitHooks
