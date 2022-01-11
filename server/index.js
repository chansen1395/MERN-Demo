const express = require ("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors'); // Enables app to talk with react

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://chansen13:YOUR_PASSWORD_HERE@firstcluster.647ez.mongodb.net/testdb?retryWrites=true&w=majority");

app.get("/getUsers", (req, res) =>{
    UserModel.find({}, (err, result) => { // Empty "{}" will find all
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }

    }); 
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});

app.listen(3001, () => { // React runs on 3000, so we use something else.
  console.log("SERVER RUNS");
})