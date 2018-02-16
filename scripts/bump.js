const fs = require('fs')
const fileName = './docs/pwabuilder-sw.js'

fs.readFile(fileName, 'utf8', function (err,data) {
  if (err) {
    return console.log(err)
  }
  var result = data.replace(/spring2018-\d+/g, `spring2018-${(new Date()).getTime()}`)

  fs.writeFile(fileName, result, 'utf8', function (err) {
     if (err) return console.log(err)
  });
});
