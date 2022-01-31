import express from 'express';
import {promises as fs} from "fs"
import mongoose from "mongoose";
import {MongoDBConn} from "../MongoDBCredential.js";
var router = express.Router();

// Connect to the mongodb database

let User; // Make User globally so I can use it later

dbConnect().catch(err => console.log(err));

async function dbConnect() {
  // mongodb+srv://<username>:<password>@<database location>/<table>?<query parameters...>
  await mongoose.connect(MongoDBConn + "info_upload?retryWrites=true&w=majority"); // myFirstDatabase is the database name (Mongo will create it if DNE)
  console.log("connected to the Mongo database");

  // Create a schema (MongoDB calls it model)
  const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
  });

  User = mongoose.model('User', userSchema); // User model using user schema
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUserData', async function(req, res, next) {
  console.log(req.body);
  res.type("text");
  //  await fs.writeFile("data/userData.json", JSON.stringify(req.body));
  try {
    // Make a new User object
    const newUser = new User({ // Refer to the User variable
      first_name: req.body.first_name, // User will send a JSON object, so we can directly access to it
      last_name: req.body.last_name,
      favorite_ice_cream: req.body.favorite_ice_cream
    });
    await newUser.save(); // time-consuming
    res.send("added data");
  }
  catch(e){
    res.send("error info: " + e);
  }
});

router.get('/getUsers', async function(req, res, next) {
  // let userData = await fs.readFile("data/userData.json")
  let allUsers = await User.find(); // Get everything in User, will return a big JSON object

  res.type("json")
  res.send(allUsers);
})

export default router;
