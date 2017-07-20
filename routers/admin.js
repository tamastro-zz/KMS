'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')
var model = require('../models')

router.use((req, res, next) => {
  if (req.session.user.role == 'administrator') {
    next()
  }
  else {
    res.sendStatus(401)
  }
})

router.get('/', (req, res) => {
  console.log(req.session);
  res.render('admin')
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
          updatedAt: new Date()
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
      updatedAt: new Date(),
      updatedAt: new Date()
    })
    .then(() => {
      res.redirect('/admin/cars')
    })
})

module.exports = router
