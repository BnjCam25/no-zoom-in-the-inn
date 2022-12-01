const User = require('../models/user')


const UsersController = {
  New: (req, res) => {
    res.render('users/new', { newUser: true })
  },

  Create: (req, res, next) => {

      const obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      }
      
      const user = new User(obj)
      const email = user.email
      console.log(req.session)
      User.findOne({ email }).then((email) => {
        if (!email) {
          
          user.save((err) => {
            if (err) {
              throw err
            }
            res.status(201).redirect('/sessions/new')
          })
        } else if (user.email !== email) {
          res.redirect('/users/new')
        }
      })
    }
      }
     

module.exports = UsersController
