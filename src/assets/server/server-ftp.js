/*eslint-disable*/
const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require("fs");
const app = express();


//HE CONSEGUIDO IMPORTAR LA VARIABLE CON LA RUTA DE DOCUMENTOS ME FALTA VER PARA CREAR CARPETA EN DOCUMENTOS Y HACER TODO LO DE COMPARTIR Y ELIMINAR LA CARPETA
//const filesDirectory = path.join(documentsDir, "../../../../../../public/archivos"); //process.cwd es directorio raíz

const tmpDirOS = os.tmpdir();

fs.mkdir(tmpDirOS + "/archivos",{recursive: true}, (err) => {
    if(err){
        console.log("ERROR "+err);
    }
});

const filesDirectory = tmpDirOS + "/archivos";


app.use('/', serveIndex(filesDirectory, {'icons': true}));
app.use(express.static(filesDirectory));
app.use(cors());

let port = 2312;
let server;

export default function serverOn(){
    if(!server){
        server = app.listen(port);
    }
}

export function serverOff(){
    if(server){
        server.close();
        server = null;
    }
}