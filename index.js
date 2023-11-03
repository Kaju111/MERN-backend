const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const {registerUser, signinUser} = require('./controllers/auth')
require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose
  .connect("mongodb://127.0.0.1:27019/self")
  .then(() => {
    console.log(`mongodb Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});


app.post('/api/register', registerUser)
app.post('/api/signin', signinUser)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
