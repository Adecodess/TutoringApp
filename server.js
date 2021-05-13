/**
 * 1. creating a express server
 * 2. connect to mongodb
 * 3. initialize express
 * 4. initialise express middleware
 * 5. create a simple get request route
 * 6. inject our routes
 * 7. listen to our app
 */

const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const { PORT } = process.env;

// connect to db
connectDB();

// initialise express
const app = express();

// initialise express middleware
app.use(express.json({ extended: false }));

// create basic express route
app.get("/", (req, res) => {
  res.json({ message: "welcome to tutoring app!!" });
});

// PORT
const port = process.env.PORT || PORT;

// listen to connection
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
