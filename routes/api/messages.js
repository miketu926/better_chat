const express = require("express");
const router = express.Router();
const data = require("./data.json");
const passport = require('passport');
const validateMessage = require('../../validation/post')
const Post = require('../../models/Post');

router.get("/messages", (req, res) => res.json(data.posts));

router.post("/sendMessage",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateMessage(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Post({
      user: req.user.id,
      message: req.body.message,
    })

    newMessage.save().then(message => res.json(message))
  }
)

module.exports = router;