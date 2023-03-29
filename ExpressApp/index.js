const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://eantoine2021:Hobbly2023@cluster0.dkcj4xj.mongodb.net/NotesDB");

const notesSchema = {
    title: String,
    content: String

}

const Note = mongoose.model('Note', notesSchema);

app.get('/', async(req, res) => {
    try {
        const notes = await Note.find({});
        res.render('index', {
            notesList: notes
        });
    } catch (err) {
        console.log(err);
    }
});




app.listen(3000, function() {
    console.log('server is running');
})