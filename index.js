// use micro framework express
const express = require("express");

// use a data file
const data = require("./data/data.json");

// use port 8000 to run server on localhost
const port = 8000;

// initialize express in a variable named app
const app = express();

// use express
app.use(express.json());

// configure express to use urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// default entry point '/' of the server => go to http://localhost:8000 after executing npm start
app.get("/", (req, res) => {
  res.json({ message: "Welcome on Express/Node Server" }).status(200);
});

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

// create one artist
app.post("/api/items", (req, res) => {
  if (
    !req.body.name ||
    !req.body.image ||
    !req.body.category ||
    !req.body.description ||
    !req.body.albums
  ) {
    res.send({ message: "Missing feilds" }).status(400);
  }

  const item = {
    id: data.length + 1,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    description: req.body.description,
    albums: req.body.albums,
  };

  data.push(item);
  res.send({ message: "Item uccessfully created !", item: item }).status(201);
});

// edit one artist
app.patch("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((element) => element.id === id);
  if (!item) {
    if (
      !req.body.name ||
      !req.body.image ||
      !req.body.category ||
      !req.body.description ||
      !req.body.albums
    )
      res
        .send({ message: "Item successfully edited !", item: item })
        .status(200);
  } else res.send({ message: "Item not found" }).status(404);
});

// delete one artist
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((element) => element.id === id);
  if (!item) {
    if (data.splice(data.indexOf(item), 1));
    res.send({ message: "Item successfully deleted !" }).status(200);
  } else res.send({ message: "Item not found" }).status(404);
});

// get one artist by name
app.get("/api/author/:name", (req, res) => {
  const item = data.find((data) => data.name === req.params.name);
  res.json(item).status(200);
});

// get one artist by category
app.get("/api/category/:name", (req, res) => {
  const item = data.filter((data) => data.category === req.params.name);
  /* console.log(req.params.name); */
  res.json(item).status(200);
});

// log server start (check your terminal to see the message)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
