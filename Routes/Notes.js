const notes = require("express").Router();
const { readAndAppend, readFromFile, readAndDelete } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const db = require("../db/db.json")

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const note = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(note, "./db/db.json");

    const response = {
      status: "success",
      body: note,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

notes.get("/:id", (req,res) =>
    res.json(notes[req.params.id])
);

notes.delete("/:id",(req, res) =>{
  let data = readAndDelete(req.params.id, "./db/db.json")
  res.json(data)
}
);

module.exports = notes;
