const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

//CONNECT TO MONGODB
require("./config/database");

//MIDDLEWARE
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

//API ROUTES
const userRoute = require("./routes/api/user");
// const loggedIn = require('./config/loggedIn')
app.use("/api/user", userRoute);

//CATCH ALL ROUTE
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//LISTENER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
