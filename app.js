const express = require('express');
const app = express();
const port = 3000;
const laptop = require('./datos.js');

app.use(express.json()); 

//Crear una laptop
app.post('/laptops', (req, res) => {
    console.log('body:', req.body); // Mostrar el cuerpo de la solicitud en la consola
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
// Actualizar una laptop por ID
app.put('/laptops/:id', (req, res) => {
    const id = req.params.id; // Obtener el ID del contacto a actualizar desde los parámetros de la ruta
    console.log(`Actualizando laptop con ID: ${id}`);
    const laptopIndex = laptop.findIndex(l => l.id == id);
    if (laptopIndex !== -1) {
        laptop[laptopIndex] = { ...laptop[laptopIndex], ...req.body };
        res.send(laptop[laptopIndex]);
    } else {
        res.status(404).send('Laptop no encontrada');
    }
});
// Eliminar una laptop por ID
app.delete('/laptops/:id', (req, res) => {
    const id = req.params.id; // Obtener el ID del contacto a eliminar desde los parámetros de la ruta
    console.log(`Eliminando laptop con ID: ${id}`);
    const laptopIndex = laptop.findIndex(l => l.id == id);
    if (laptopIndex !== -1) {
        laptop.splice(laptopIndex, 1); // Eliminar la laptop del arreglo
        res.send('¡Elemento eliminado!');
    } else {
        res.status(404).send('Laptop no encontrada');
    }
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});