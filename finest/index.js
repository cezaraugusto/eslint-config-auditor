const recommended = require('../recommended/index')
const finest = require('./finest.json')

module.exports = {
  ...recommended,
  ...finest
}
