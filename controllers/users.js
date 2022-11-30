const User = require("../models/user")
const path = require('path')

const UsersController = {
  New: (req, res) => {
    res.render('users/new');
  },

  Create: (req, res) => {
    const user = new User(req.body);
    console.log(req.body.password)
    user.save((err) => {
      if (err) {
        throw err;
      }
      console.log(req.body)
      res.status(201).redirect("/");
  });
},
};



module.exports = UsersController;