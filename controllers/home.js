// const Post = require('../models/post')

const HomeController = {
    Index: (req, res) => {
      //  if user has an open session, show "You're logged in", else show "You need to log in"
    //   if (req.session.user) {
        res.render('home/index')
    //   } else {
    //     res.render('home/index')
    //   }
    }
  }
  
  module.exports = HomeController
  