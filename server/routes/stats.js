const express = require('express')
const Book = require('../models/Book')
const User = require('../models/User')

const router = new express.Router()

router.get('/', (req, res) => {
  User
    .count({})
    .then(users => {
      Book
        .count({})
        .then(products => {
          res.status(200).json({
            products,
            users
          })
        })
    })
})

module.exports = router
