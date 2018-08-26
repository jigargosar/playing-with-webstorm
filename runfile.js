const { run } = require('runjs')

function hello(name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

function makedir() {
  run('mkdir somedir')
}

module.exports = {
  hello,
  makedir,
}
