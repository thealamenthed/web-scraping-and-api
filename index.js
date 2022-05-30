
// use micro framework express
const express = require('express');

// use a data file
const data = require('./data/data.json');

// use port 8000 to run server on localhost
const port = 8000;

// initialize express in a variable named app
const app = express();

app.use(express.json());
// configure express to use urlencoded
app.use(express.urlencoded({
    extended: true
}));

// default entry point '/' of the server => go to http://localhost:8000 after executing npm start
app.get('/', (req, res) => {
    res.json({ message : 'Welcome on Express/Node Server'}).status(200);
});

// log server start (check your terminal to see the message)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/author/:name', (req, res) => {

    const item = data.find(data => data.name === req.params.name);
    res.json(item).status(200);
});

app.get('/api/category/:name', (req, res) => {
    
    const item = data.filter(data => data.category === req.params.name);
    /* console.log(req.params.name); */
    res.json(item).status(200);
});
