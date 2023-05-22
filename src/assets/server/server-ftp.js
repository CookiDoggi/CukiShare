/*eslint-disable*/
const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');
const path = require('path');
const app = express();
const filesDirectory = path.join(__dirname, "../../../../../../public/archivos"); //process.cwd es directorio raíz

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
