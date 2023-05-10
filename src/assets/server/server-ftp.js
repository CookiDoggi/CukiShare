const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const cors = require('cors');
const app = express();
const filesDirectory = path.join(__dirname, '../../../public/archivos');
app.use(express.static(filesDirectory));
app.use('/', serveIndex(filesDirectory, {'icons': true}));
app.use(cors());

let isSleeping = true;
const port = 3000;

server = app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});