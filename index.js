const cdnLinkCheck = require('./components/cdnLinkCheck')
const seadEmail = require('./components/seadEmail')
const colorText = require('./components/colorText')
const httpString = require('./components/httpString')


console.log(cdnLinkCheck,
  seadEmail,
  colorText,
  httpString);

exports= {
  cdnLinkCheck,
  seadEmail,
  colorText,
  httpString
}