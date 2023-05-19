const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB, { useNewUrlParser: true });

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    image: {
      type: String,
      
    },
    title: {
      type: String,
      
    },
    duty: {
        type: String,
        
      },
      work: {
        type: String,
      
      },
      workTime: {
        type: String,
        
      },
      location: {
        type: String,
    
      },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UserSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

//! Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//! Get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(404).json({ message: "Not exist" });
  }
});

//! Add new User
app.post("/users", async (req, res) => {
    const updatesUser = req.body
  try {
    let user = new Users(updatesUser);

    user.save();
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up on Port: ${PORT}`);
});
