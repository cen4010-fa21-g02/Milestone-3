const express = require("express");
const app = express();
//const port = 4000
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://eantoine2021:Hobbly2023@cluster0.dkcj4xj.mongodb.net/NotesDB", { useNewUrlParser: true }, { useUnifiedTopology: true });


//create a data schema
const notesSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Notes", notesSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    let NewNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    NewNote.save();
    res.redirect('/');

})

app.listen(3000, function() {

    console.log("server is running on 3000");
})