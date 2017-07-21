'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')
var model = require('../models')
var kurang = require('../helpers/kurang')
var setter = require('../helpers/setter')
var hash = require('../helpers/hash')

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
          include: [model.User, model.Car],
          order: [['createdAt', 'ASC']]
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
  model.Bridge.findOne({
      where: {
        UserId: req.session.user.idUser,
        CarId: req.body.id
      }
    })
    .then(con => {
      model.Bridge.update({
          hutang: kurang(con.hutang, con.sisaBulan),
          status: setter(con.hutang, con.sisaBulan)
        }, {
          where: {
            UserId: req.session.user.idUser,
            CarId: req.body.id
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

router.get('/editpassword/:id', (req,res) => {
  model.User.findOne({
    where: {
      id: req.session.user.idUser
    }
  })
  .then((data) => {
    res.render('user_edit_password', {dataUser: data})
  })
})

router.post('/editpassword/:id', (req,res) => {
  model.User.findOne({
    where: {
      id: req.session.user.idUser
    }
  })
  .then(data => {
    console.log('------- ' + data.password);
    if (hash(data.secret, req.body.passwordlama) == data.password) {
      if (req.body.passwordbaru == req.body.confpasswordbaru) {
        model.User.update({
          password: hash(data.secret, req.body.passwordbaru)
        }, {
          where: {
            id: req.params.id
          }
        })
        res.redirect('/profile')
      }
      else {
        res.send('konfirmasi password baru salah')
      }
    }
    else {
      res.send('password lama salah')
    }
  })
})

module.exports = router
