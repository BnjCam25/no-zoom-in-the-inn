var express = require('express');
var router = express.Router();

/* GET users listing. */
const UsersController = require('../controllers/users')

router.get('/new', UsersController.New)
router.post('/', UsersController.Create)


module.exports = router
