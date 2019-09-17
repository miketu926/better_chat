const express = require("express")
const mongoose = require('mongoose')
const messages = require("./routes/api/messages")
const users = require("./routes/api/users")

const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Welcome to Better Chat!"));
app.use("/api", users)
app.use("/api", messages)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));