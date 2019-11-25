
var express = require("express");
var path = require("path");
var fs = require ("fs")


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var rawdata = fs.readFileSync("../db/db.json");

var notes = JSON.parse(rawdata);


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});


app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// app.delete("/api/notes/:id", function(req, res) {
//   let noteID = req.params.id;
//   let newID = 0;
//   console.log(`Deleting note with ID ${noteID}`);
//   notes = notes.filter(currnote => {
//       return currnote.id != noteID;
//   })

//   for (currnote of notes) {
//       currnote.id = newID.toString();
//       newID++;
//   }
//   fs.writeFileSync("../db/db.json", JSON.stringify(notes));
//   res.json(notes);
// })

app.delete('/api/notes/:id', (req, res) => {
  let deleteId = req.params.id; //Get the id through req.params.id of the object you are going to delete
  let deleteObj = noteJson.find(note => note.id == deleteId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
  let deleteIndex = userJson.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
  noteJson.splice(deleteIndex,1); // Splice/ remove the object from the JSON Array.
 res.send(deleteObj); // Send the deleted object as response.
});


app.post("/api/notes", function(req, res) {
  var newNote = req.body;

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});