'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')

router.get('/', (req, res) => {
  model.User.findAll({
      order: [['name', 'ASC']],
      // include: [model.Bridge]
    })
    .then(profil => {
      res.render('profile', {
        dataUser: profil,
      })
    })
})

module.exports = router
