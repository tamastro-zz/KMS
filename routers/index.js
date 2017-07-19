'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')

router.get('/', (req,res) => {
  res.render('index')
})

module.exports = router
