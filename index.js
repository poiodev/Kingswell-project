const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Carpeta con tu index.html

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
