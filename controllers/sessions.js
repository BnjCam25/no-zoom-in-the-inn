const User = require('../models/user')

const SessionsController = {
  New: (req, res) => {
    if (req.session.user) {
      res.redirect('/posts')
    } else {
      res.render('sessions/new', { newUser: true })
    }
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;
console.log(password)
    // finds the user with an email that matches the email input given by the user
    User.findOne({ email: email }).then((user) => {
        // if user is not found, then send to login page
      if (!user) {
        res.redirect("/sessions/new");
        // else if password is not the same, send to login page
      } else if (user.password != password) {
        res.redirect("/sessions/new");
        // else password is correct, 
      } else {
        req.session.user = user;
        res.redirect("/posts");
      }
    });
  },

  Destroy: (req, res) => {
    console.log('logging out')
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid')
    }
    res.redirect('/sessions/new')
  }
}

module.exports = SessionsController
