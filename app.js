const express = require('express');
const app = express();
const port = 3000;
const laptop = require('./datos.js');

app.use(express.json()); 

//Crear una laptop
app.post('/laptops', (req, res) => {
    req.body.id = laptop.length + 1;
    const nuevaLaptop = req.body; 
    laptop.push(nuevaLaptop); 
  res.send(nuevaLaptop);
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});