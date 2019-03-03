const express = require('express')
const authCheck = require('../config/auth-check')
const Destination = require('../models/Destination')

const router = new express.Router()

function validateDestinationCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Destination name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 200 symbols.'
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const destinationObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateDestinationCreateForm(destinationObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Destination
      .create(destinationObj)
      .then((createdDestination) => {
        res.status(200).json({
          success: true,
          message: 'Destination added successfully.',
          data: createdDestination
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Destination with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const destinationId = req.params.id
    const destinationObj = req.body
    const validationResult = validateDestinationCreateForm(destinationObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Destination
      .findById(destinationId)
      .then(existingDestination => {
        existingDestination.title = destinationObj.title
        existingDestination.image = destinationObj.image
        existingDestination.description = destinationObj.description
      
        existingDestination
          .save()
          .then(editedDestination => {
            res.status(200).json({
              success: true,
              message: 'Destination edited successfully.',
              data: editedDestination
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Destination with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Destination
    .find()
    .then(destinations => {
      res.status(200).json(destinations)
    })
})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Destination
    .findById(id)
    .then(destination => {
      if (!destination) {
        return res.status(200).json({
          success: false,
          message: 'Destination not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = destination.reviews
      reviews.push(reviewObj)
      destination.reviews = reviews
      destination
        .save()
        .then((destination) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: destination
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Destination
    .findById(id)
    .then(destination => {
      if (!destination) {
        const message = 'Destination not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = destination.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      destination.likes = likes
      destination
        .save()
        .then((destination) => {
          res.status(200).json({
            success: true,
            message: 'Destination liked successfully.',
            data: destination
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Destination
    .findById(id)
    .then(destination => {
      if (!destination) {
        let message = 'Destination not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = destination.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      destination.likes = likes
      destination
        .save()
        .then((destination) => {
          res.status(200).json({
            success: true,
            message: 'Destination unliked successfully.',
            data: destination
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Destination
      .findById(id)
      .then((destination) => {
        destination
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Destination deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
