const express = require("express");
const router = express.Router();
const data = require("./data.json")

router.get("/users", (req, res) => res.json(data.users));

module.exports = router;