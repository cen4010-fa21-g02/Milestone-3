 const express = require("express");
 const app = express();
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const bcrypt = require("bcrypt");

 app.use(bodyParser.urlencoded({ extended: true }));


 mongoose.connect("mongodb+srv://eantoine2021:Hobbly2023@cluster0.dkcj4xj.mongodb.net/Hobbly?retryWrites=true&w=majority")


 //Create a data schema
 const usersSchema = {
     first_name: String,
     last_name: String,
     email: String,
     username: String,
     password: String,
     cpassword: String

 }

 const Users = mongoose.model("Users", usersSchema);

 app.get("/", function(req, res) {

     res.sendFile(__dirname + "/html-mongo/register.html")
 })


 app.get("/", function(req, res) {

     res.sendFile(__dirname + "/html-mongo/login.html")
 });





 app.post("/", function(req, res) {

     //  const password = req.body.password;
     //  const cpassword = req.body.cpassword;
     //  if (password !== cpassword) {
     //      res.send("passwords do not match");
     //      return;
     //  }


     let newUsers = new Users({
         title: req.body.title,
         content: req.body.content,
         email: req.body.email,
         username: req.body.username,
         password: req.body.password,
         cpassword: req.body.cpassword

     });



     newUsers.save();

     res.redirect("/");


 })


 app.post("/login", async function(req, res) {
     const { username, password } = req.body;
     const user = await Users.findOne({ username: username });
     if (!user) {
         res.send("Incorrect credentials");
         return;
     }
     const passwordMatch = await bcrypt.compare(password, user.password);
     if (!passwordMatch) {
         res.send("Incorrect credentials");
         return;

     }
     res.send("Login successful");

 });

 app.listen(2000, function() {


     console.log("server is running on 3000");
 })