// use micro framework express
const express = require('express');

// use axios
const axios = require('axios');

//use cors
const cors = require('cors');

// use port 8000 to run server on localhost
const port = 8000;

// initialize express in a variable named app
const app = express();

app.use(express.json());
// configure express to use urlencoded
app.use(express.urlencoded({
    extended: true
}));

// configure cors
app.use(cors('*'));

// default entry point '/' of the server => go to http://localhost:8000 after executing npm start
app.get('/', (req, res) => {
    res.json({ message : 'Welcome on Express/Node Server'}).status(200);
});

// ENTITY ITEM 
// get all artists
app.get("/api/items", (req, res) => {
  res.send(data).status(200);
});

// get one artist by id
app.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((element) => element.id === id);
  if (item) res.send(item).status(200);
  else res.send({ message: "Item not found" }).status(404);
});

    const item = {
    id: data.length + 1,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    description: req.body.description,
    albums: req.body.albums,
    note: req.body.note,
  };


app.get('/api/author/:name', (req, res) => {

    const item = data.find(data => data.name === req.params.name);
    res.json(item).status(200);
});

app.get('/api/category/:name', (req, res) => {

    const item = data.filter(data => data.category === req.params.name);
    /* console.log(req.params.name); */
    res.json(item).status(200);
});

app.get('/api/album/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(el => el.id === id);
    if (item) res.send(item).status(200);
    else res.send('Item not found').status(404)
});




/* Voilà ce que j'ai ajouté aujourd'hui. Ca permet de de filtrer et d'afficher ceux qui ont une note inférieur ou égal à 10. 
  J'ai testé et visiblement ça fonctionne */

app.get('/api/note/:number', (req, res) => { 
    const item = item.filter(notes => notes.note <= 10)
    if (item) res.send(item).status(200);
    else res.send('Item not found').status(404) 
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});