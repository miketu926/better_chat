const express = require("express");
const router = express.Router();
const data = require("./data.json");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

router.get("/users", (req, res) => res.json(data.users));

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.status(400).json({ username: "This username already exists!" })
      } else {
        const newUser = new User({
          username: req.body.username,
          real_name: req.body.real_name,
          password: req.body.password,
          verified: false
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser.save().then(user => res.send(user)).catch(err => console.log(err));
          })
        })

      }
    })
})

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ username: "This username does not exist!" })
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) { res.json({ msg: "Success" }) }
          else { return res.status(400).json({ password: "Incorrect password!" }) }
        })
    })

})

module.exports = router;