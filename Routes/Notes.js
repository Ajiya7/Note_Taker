const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>res.json(JSON.parse(data))
    );
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {

      const note = {
        title,
        text
      };
  
      readAndAppend(note, './db/db.json');
  
      const response = {
        status: 'success',
        body: note,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
});

// notes.get("/:title", (req,res) =>
//     res.json(notes[req.params.title])
// );

// notes.delete("/:title",(req, res) =>
//     res.splice(req.params.title, 1)
// );

  module.exports = notes;