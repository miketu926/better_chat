const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const messages = require("./routes/api/messages");
const users = require("./routes/api/users");
const passport = require('passport');

// const User = require('./models/User')
// const user = new User({ user params })
// user.save()l

const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Better Chat!")
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users)
app.use("/api/chat", messages)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));