const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const restController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const admin = require('./modules/admin')
const passport = require('../config/passport')
const upload = require('../middleware/multer')

router.get('/events/create', adminController.createRestaurant)
router.get('/event/:id/edit', adminController.editRestaurant)
router.get('/event/:id', adminController.getRestaurant)
// router.get('/users', adminController.getUsers)
// router.patch('/users/:id', adminController.patchUser)

router.put('/events/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/events/:id', adminController.deleteRestaurant)
router.get('/events', adminController.getRestaurants)
router.post('/events', upload.single('image'), adminController.postRestaurant)


router.get('', (req, res) => res.redirect('/events'))

module.exports = router
