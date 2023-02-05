require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Users");
const app = express();

// connecting to data base 
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("connected to database"))
);

app.use(express.json());

//connecting to server
const server = app.listen(process.env.PORT, function () {
  console.log(`Server listening on port:${process.env.PORT}`);
});

//getting all users in the database

app.get("/getallusers", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

//adding users
app.post("/adduser", (req, res) => {
  console.log(req.body);
  const { name, lastName, age } = req.body;
  const newUser = new User({
    name,
    lastName,
    age,
  });
  newUser
    .save()
    .then((response) => res.send(`user added:${response}`))
    .catch((err) => console.log(err));
});

//edit user
app.put("/edituser/:userId", (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//delete user
app.delete("/deleteuser/:userId", (req, res) => {
  User.findByIdAndRemove(req.params.userId, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});
