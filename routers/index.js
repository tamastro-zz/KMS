'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')
var model = require('../models')
var hash = require('../helpers/hash')

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  if (req.body.password == req.body.confpassword) {
    model.User.create(({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        username: req.body.username,
        password: req.body.password,
      }))
      .then(() => {
        res.send('berhasil sign-up')
      })
  }
  else {
    res.send('konfirmasi password gagal')
  }
})

router.post('/login', (req, res) => {
  model.User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(data => {
      model.User.findOne({
          where: {
            password: hash(data.secret, req.body.password)
          }
        })
        .then(data2 => {
          if (data2) {
            req.session.user = {
              idUser: data.id,
              username: req.body.username,
              role: data.role
            }
            console.log(req.session.user);
            res.redirect('/profile')
          }
          else {
            res.send('password salah')
          }
        })
    })
})

module.exports = router
