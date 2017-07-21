'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')
var model = require('../models')
var kurang = require('../helpers/kurang')
var setter = require('../helpers/setter')

router.use((req, res, next) => {
  if (req.session.user.role == 'administrator') {
    next()
  }
  else {
    res.sendStatus(401)
  }
})

router.get('/', (req, res) => {
  // console.log(req.session);
  model.User.findAll({
    where: {
      role: 'user'
    }
  })
  .then(data => {
    res.render('admin', {dataUser: data})
  })
})

router.get('/cars', (req, res) => {
  model.Car.findAll({
      order: [['brand', 'ASC']]
    })
    .then(car => {
      res.render('admin_cars', {
        dataCars: car
      })
    })
})

router.get('/cars/delete/:id', (req, res) => {
  model.Car.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/admin/cars')
    })
})

router.get('/cars/edit/:id', (req, res) => {
  model.Car.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((data) => {
      res.render('admin_car_edit', {
        dataCar: data
      })
    })
})

router.post('/cars/edit/:id', (req, res) => {
  model.Car.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      model.Car.update({
          brand: req.body.brand,
          type: req.body.type,
          price: req.body.price,
          updatedAt: new Date(),
          link_gambar: req.body.gambar
        }, {
          where: {
            id: req.params.id
          }
        })
        .then(() => {
          res.redirect('/admin/cars')
        })
    })
})

router.get('/car/add', (req, res) => {
  res.render('admin_car_add')
})

router.post('/car/add', (req, res) => {
  model.Car.create({
      brand: req.body.brand,
      type: req.body.type,
      price: req.body.price,
      link_gambar: req.body.gambar,
      updatedAt: new Date(),
      updatedAt: new Date(),
      link_gambar: req.body.gambar
    })
    .then(() => {
      res.redirect('/admin/cars')
    })
})

router.get('/usercar/:id', (req,res) => {
  model.Bridge.findAll({
    where: {
      UserId: req.params.id
    },
    include: [model.User, model.Car],
    order: [['createdAt', 'ASC']]
  })
  .then(data => {
    res.render('admin_user_car', {dataUserCar: data})
  })
})

router.post('/usercar/:id', (req, res) => {
  model.Bridge.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    model.Bridge.update({
      hutang: kurang(data.hutang, data.sisaBulan),
      status: setter(data.hutang, data.sisaBulan)
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect(`/admin/usercar/${data.UserId}`)
    })
  })
})

router.get('/user/delete/:id', (req,res) => {
  model.User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/admin')
  })
})

// router.get('/user/reset_password/:id', (req,res) => {
//   model.User.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(data => {
//     res.render('admin_user_reset_password', {dataUser: data})
//   })
// })

// router.post('/user/reset_password/:id', (req,res) => {
//   if (req.body.password == req.body.confpassword) {
//     model.User.update({
//       password: req.body.password
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(() => {
//       res.redirect('/admin')
//     })
//   }
//   else {
//     res.send('konfirmasi password gagal')
//   }
//
// })

module.exports = router
