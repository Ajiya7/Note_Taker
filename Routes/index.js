const express = require("express");

const notesRouter = require("./Notes");

const app = express();

app.use("/notes", notesRouter);

module.exports = app;
