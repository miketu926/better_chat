const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const messages = require("./routes/api/messages");
const users = require("./routes/api/users");
const passport = require('passport');

const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/users", users)
app.use("/chat", messages)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));