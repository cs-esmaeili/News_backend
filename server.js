const path = require("path");
const dotenv = require('dotenv').config();
var cors = require('cors');
const fileUpload = require("express-fileupload");
const express = require("express");
const mongoose = require("mongoose");
const { connect } = require('./app/database');
const userRoute = require("./app/routes/user");
const adminRoute = require("./app/routes/admin");
const globalRoute = require("./app/routes/global");
const { checkRoutePermission } = require("./app/middlewares/checkAuth");

const app = express();
//* Database connection
connect(app);

//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* File Upload Middleware
app.use(fileUpload());


app.use(cors());




//* Static Folder
app.use(express.static(path.join(__dirname, "public")));


//* Routes

app.use("/admin", globalRoute);
app.use(checkRoutePermission);
app.use("/admin", adminRoute);
app.use("/user", userRoute);

//* 404 Page
// app.use(require("./controllers/errorController").get404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
});
