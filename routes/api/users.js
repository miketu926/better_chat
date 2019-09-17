const express = require("express");
const router = express.Router();
const data = require("./data.json")
const User = require("../../models/User")

router.get("/users", (req, res) => res.json(data.users));

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.status(400).json({ username: "This username already exists." })
      } else {
        const newUser = new User({
          username: req.body.username,
          real_name: req.body.real_name,
          password: req.body.password,
          verified: false
        });

        newUser.save().then(user => res.send(user)).catch(err => res.send(err));
      }
    })
})

module.exports = router;