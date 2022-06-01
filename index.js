// use micro framework express
const express = require("express");
// use a data file
const data = require("./data/data.json");
//use axios
const axios = require("axios");
// use cors
const cors = require("cors");
//use jsdom
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// use port 8000 to run server on localhost
const port = 8000;
// initialize express in a variable named app
const app = express();
// use cors to allow all origins
app.use(cors("*"));

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
      res.send({ message: "Item successfully edited !", item: item }).status(200);
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
 
// ENTITY POST
app.get('api/post', async (req, res) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data).status(200);
});


// WEB SCRAPING FROM LAPTOP LINUX
// https://laptopwithlinux.com/linux-laptops/
// https://laptopwithlinux.com/mini-computers/
// https://laptopwithlinux.com/accessories/
app.get('/api/laptos', async (req, res) => {
    const url = 'https://laptopwithlinux.com/linux-laptops/'; // je requete une url
    jsdom.fromURL(url).then(dom => { // accès au doc html de la page 
        const laptops = dom.window.document.getElementById('.us_grid_1').querySelectorAll('article'); // depuis la grid_1 on veut récupérer tous les éléments html article, on retrouve un tableau d'élément 
        const results = []; // j'initialise un tableau vide de resultat dans lequel je vais ajouter les laptops restructurés 
        
         laptopsGrid.forEach(element => { // je vais boucler tous mes laptops 
            const item = {}; // pour chacun des ses élément je vais reconstruire sa donnée, et instancier un objet vide
            const title = element.querySelector('h2').textContent; // puis cette objet va prendre pour chaque attribut un title à chaque fois que je vais aller chercher dans mon h2 dans mon élément dome 
            const image = element.querySelector('img').src;
            const price = element.querySelector('bdi').textContent;
            const infos = []; // instancier un tableau vide dans lequel je vais ajouter les infos 

            const labelsInfos = Array.from(element.getElementByclassName('progress_text')); // recupérer tous les labels et les textinfos des informations de l'article en question
            const textInfos = Array.from(element.getElementByclassName('progress_info')); //Array.from reconvertit la donnée en tableau

            for (let i = 0; i < labelsInfos.length; i++) { // je boucle sur le nombre de label ou de textinfos  
                item.infos.push({ 'label': labelsInfos[i].textContent, 'value': textInfos[i].textContent });
            } 
            results.push(item); // pour chaque label ou textinfos je vais aller pusher une nouvelle info dans mon item, cette nouvelle info est un nouveau objet qui aura un attribut label avec le textcontent du label et un attribut value avec le textcontent du textinfos, une fois que je sors de la boucle je push mon item, restructurer dans mon tableau de resultat
        });
        res.send(results).status(200); // en sortie de la boucle je renvoie le resultat à mon client
    });
});




// log server start (check your terminal to see the message)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

