'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')

router.get('/', (req, res) => {
  model.Bridge.findOne({
      where: {
        UserId: req.session.user.idUser
      },
      include: [model.User, model.Car]
    })
    .then(profil => {
      res.render('profile', {
        dataUser: profil,
      })
    })
})

module.exports = router
