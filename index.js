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