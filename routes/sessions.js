const express = require('express')
const router = express.Router()

// connects to the controller
const SessionsController = require('../controllers/sessions')

router.get('/new', SessionsController.New)
router.post('/', SessionsController.Create)
router.delete('/', SessionsController.Destroy)

module.exports = router
