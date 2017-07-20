'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')
var model = require('../models')
var hash = require('../helpers/hash')


router.get('/', (req, res) => {
  console.log(req.session);
  res.render('index')
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
      res.send('berhasil sign-up')
    })
  }
  else {
    res.send('konfirmasi password gagal')
  }
})

router.get('/login', (req,res) => {
  res.render('login')
})

router.post('/login', (req,res) => {
  model.User.findOne({
    where: {
      username: req.body.username,
      // role: 'user'
    }
  })
  .then(data => {
    model.User.findOne({
      where: {
        password: hash(data.secret, req.body.password),
        // role: 'user'
      }
    })
    .then(data2 => {
      if (data2) {
        req.session.username = data2.username
        // req.session.password = data2.password
        if (data2.role == 'administrator') {
          req.session.role = data2.role
          // res.send('berhasil login sebagai admin')
          res.redirect('/admin')
        }
        else if (data2.role == 'user') {
          req.session.role = data2.role
          res.send('berhasil login sebagai user')
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

router.get('/logout', (req,res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
