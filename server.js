const path = require("path");
const dotenv = require('dotenv').config();
var cors = require('cors');
const fileUpload = require("express-fileupload");
const express = require("express");
const mongoose = require("mongoose");
const { connect } = require('./app/database');
const adminController = require("./app/controllers/admin");
const fileController = require("./app/controllers/file");
const category = require("./app/routes/category");
const file = require("./app/routes/file");
const post = require("./app/routes/post");
const role = require("./app/routes/role");

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
app.use(express.static(path.join(__dirname, "app", "public")));


//* Routes

app.post("/logIn", adminController.logIn);
app.post("/register", adminController.register);
app.get("/file/:file_id", fileController.file);
// app.use(checkRoutePermission);
app.use("/role", role);
app.use("/category", category);
app.use("/post", post);
app.use("/file", file);


//* 404 Page
// app.use(require("./controllers/errorController").get404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
});
