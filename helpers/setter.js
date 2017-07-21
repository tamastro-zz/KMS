'use strict'

module.exports = (utang, mines) => {
  if (utang <= mines) {
    return true
  }
  else {
    return false
  }
}
