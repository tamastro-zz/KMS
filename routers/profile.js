'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')

router.get('/', (req, res) => {
  model.User.findOne({
      where: {
        id: req.session.user.idUser
      }
    })
    .then(profil => {
      model.Bridge.findAll({
          where: {
            UserId: profil.id
          },
          include: [model.User, model.Car]
        })
        .then(mobil => {
          res.render('profile', {
            dataUser: profil,
            dataMobil: mobil
          })
        })
    })
})

router.post('/', (req, res) => {
  model.Bridge.findAll({
      where: {
        UserId: req.session.user.idUser
      }
    })
    .then(con => {
      console.log(con);
      model.Bridge.update({
          hutang: con.hutang - con.sisaBulan,
          status: setter
        }, {
          where: {
            UserId: req.session.user.idUser
          }
        })
        .then(() => {
          res.redirect('/profile')
        })
    })
})

router.get('/edit/:id', (req, res) => {
  model.User.findOne({
      where: {
        id: req.session.user.idUser
      }
    })
    .then(editP => {
      res.render('editprofile', {
        editUser: editP,
      })
    })
})

router.post('/edit/:id', (req, res) => {
  model.User.update({
      name: `${req.body.name}`,
      address: `${req.body.address}`,
      phone: `${req.body.phone}`,
      email: `${req.body.email}`,
      updatedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/profile')
    })
})

module.exports = router
