const path = require("path");
const dotenv = require('dotenv').config();
const fileUpload = require("express-fileupload");
const express = require("express");
const mongoose = require("mongoose");
const { connect } = require('./app/database');
const postRoute = require("./app/routes/post");
const admin = require("./app/routes/admin");
const app = express();
//* Database connection
connect(app);

//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* File Upload Middleware
app.use(fileUpload());

//* Session
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         unset: "destroy",
//         store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
// );

//* Passport
// app.use(passport.initialize());
// app.use(passport.session());


//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
// app.use("/", require("./routes/blog"));
app.use("/admin", admin);
app.use("/post", postRoute);
// app.use("/dashboard", require("./routes/dashboard"));

//* 404 Page
// app.use(require("./controllers/errorController").get404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
});
