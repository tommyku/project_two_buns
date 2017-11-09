const fs = require('fs')
if (process.argv.length < 2 || !fs.existsSync(process.argv[2])) {
  console.error('You must specify the input file that exists')
  process.exit(-1)
}

const Database = require(process.argv[2])

if (!fs.existsSync('./docs')) {
  fs.mkdirSync('./docs')
}

for (let i = 0; i < Database.length; ++i) {
  const folderPath = `./docs/${i}`
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
  for (let timeslot = 0; timeslot < Database[i].length; ++timeslot) {
    const timeslotData = Database[i][timeslot]
    const filePath = `${folderPath}/${timeslot}.json`
    fs.writeFileSync(filePath, JSON.stringify(timeslotData), 'utf8')
  }
}
