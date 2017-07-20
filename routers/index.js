'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')
var model = require('../models')
var hash = require('../helpers/hash')


router.get('/', (req, res) => {
  res.render('index')
})

router.get('/login', (req, res) => {
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
        password: req.body.password
      }))
      .then(() => {
        res.redirect('/login')
      })
  }
  else {
    res.send('konfirmasi password gagal')
  }
})

router.post('/login', (req, res) => {
  model.User.findOne({
      where: {
        username: req.body.username,
        // role: 'user'
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
            req.session.username = data2.username
            if (data2.role == 'administrator') {
              req.session.user = {
                idUser: data.id,
                username: req.body.username,
                role: data2.role
              }

              console.log(req.session.user);
              res.redirect('/admin')
            }
            else if (data2.role == 'user') {
              req.session.user = {
                idUser: data.id,
                username: req.body.username,
                role: data2.role
              }
              res.redirect('/profile')
            }
          }
          else {
            res.send('password salah')
          }
        })
    })
    .catch(err => {
      res.send('username tidak ada')
    })
})


router.use((req, res, next) => {
  if (req.session.user) {
    next()
  }
  else {
    res.sendStatus(403)
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
