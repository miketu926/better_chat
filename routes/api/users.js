const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const validLoginInput = require("../../validation/login");

router.get("/all", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ error: "No users found" }))
});

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
  const { errors, isValid } = validLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ username: "This username does not exist!" })
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              username: user.username,
              real_name: user.real_name
            }

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

module.exports = router;