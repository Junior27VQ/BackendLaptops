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
// Recuperar una laptop por ID
app.get('/laptops/:id', (req, res) => {
    const id = req.params.id; // Obtener el ID de la laptop desde los parámetros de la ruta
    console.log(`Obteniendo laptop con ID: ${id}`);
    const laptopEncontrada = laptop.find(lap => lap.id == id); // Buscar la laptop por ID
    if (laptopEncontrada) {
        res.send(laptopEncontrada); // Enviar la laptop encontrada como respuesta
    } else {
        res.status(404).send('Laptop no encontrada'); //Enviamos un mensaje de error si no se encuentra la laptop
    }
});
// Recuperar todas las laptops
app.get('/laptops', (req, res) => {
  res.send(laptop);
}); 

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});