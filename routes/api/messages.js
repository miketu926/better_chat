const express = require("express");
const router = express.Router();
const data = require("./data.json")

router.get("/messages", (req, res) => res.json(data.posts));

module.exports = router;