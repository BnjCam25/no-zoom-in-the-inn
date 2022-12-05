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

      User.findOne({ email }).then((email) => {
        if (!email) {
          
          req.session.user = user
          user.save((err) => {
            if (err) {
              throw err
            }
            res.status(201).redirect('/sessions/new')
          })
        } else if (user.email !== email) {
          console.log('had this already')
          res.render('users/new', { msg: 'email has been used' });
        }
      })

  },

  All: (req, res) => {
    console.log(req.session.user._id)
    User.find({_id : {'$ne': req.session.user._id}}).exec((err, users) => {
      if (err) {
        throw err
      }
      res.render('users/all', { users, current_user: req.session.user.first_name, current_session: req.session.user._id, user_first_name: req.body.first_name, user_last_name: req.body.user_last_name })
    })
  },

  AddFriend: (req, res) => {
    //    // check if current user is in the friends list
      User.findOne({ _id: req.body.id, friends: req.session.user._id }).exec((err, result) => {
        if (err) {
          throw err
        }
        if (result) {
          User.findOneAndUpdate({ _id: req.body.id }, { $pull: { friends: req.session.user._id } }).exec((err) => {
            if (err) {
              throw err
            }
            User.findOneAndUpdate({ _id: req.session.user._id }, { $pull: { friends: req.body.id } }).exec((err) => {
              if (err) {
                throw err
              }
              res.status(201).redirect('/users/all')
            })
          })
        } else {
          User.findOneAndUpdate({ _id: req.body.id }, { $push: { friends: req.session.user._id } }).exec((err) => {
            if (err) {
              throw err
            }
            User.findOneAndUpdate({ _id: req.session.user._id }, { $push: { friends: req.body.id } }).exec((err) => {
              if (err) {
                throw err
              }
              res.status(200).redirect('/users/all')
            })
          })
        }
      })
    },
    Profile: (req, res) => {
        
      User.find({ _id : `${req.session.user._id}`
      })
          .exec((err) => {
        if (err) {
          throw err
        }
        res.render('users/profile', {  
          first_name: req.session.user.first_name, 
          last_name: req.session.user.last_name,  
          email: req.session.user.email,
          wish_list: req.session.user.wish_list,
          dietary_requirements: req.session.user.dietary_requirements,
          friends: req.session.user.friends
        })
      })
    }
  }
    
module.exports = UsersController
