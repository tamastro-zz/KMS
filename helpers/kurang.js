'use strict'

module.exports = (utang, mines) => {
  if (utang < mines) {
    return 0
  }
  else {
    return utang - mines
  }
}
