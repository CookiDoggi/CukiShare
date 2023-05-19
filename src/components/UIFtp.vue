<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-start">
      <div class="mx-auto">
        <p class="h1 fw-bold text-center mt-3">CukiFTP</p>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <DragDrop @recieve-files="uploadFiles"></DragDrop>
    </div>
    <div class="row d-flex justify-content-center input-group input-group-sm mb-4">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">IP</span>
      </div>
      <input
        v-model="ip"
        readonly
        type="text"
        class="form-control text-center col-6"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
    <div class="row d-flex justify-content-center">
      <button @click="automatedStartStopServer" type="button" class="btn btn-primary">
        {{ actionButton }}
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const shell = require("shelljs"); //Para iniciar comandos de shell
const kill = require("tree-kill"); //Para matar procesos padres y hijos
const path = require("path");
const fs = require("fs");
const os = require("os");

import { file } from "tmp-promise";
import DragDrop from "../components/DragDrop.vue";

export default {
  name: "UIFtp",
  mounted() {},
  data() {
    return {
      serverStarted: false,
      serverProcess: undefined,
      ip: this.getExactIP() + ":2312",
      //filesDirectory: path.join(process.cwd(), "public/archivos"),
      filesDirectory: path.join(process.cwd(), "public/archivos"),
    };
  },
  props: {},
  methods: {
    async automatedStartStopServer() {
      try {
        if (!this.serverStarted) {
          this.startServer();
          this.serverStarted = true;
        } else {
          this.stopServer();
          this.serverStarted = false;
        }
      } catch (error) {
        console.error("Error al iniciar o parar el servidor:\n", error);
      }
    },
    startServer() {
      //console.log("iniciado");
      this.serverProcess = shell.exec("npm run server-ftp", { async: true });
    },
    stopServer() {
      //console.log("apagado");
      if (this.serverProcess) {
        kill(this.serverProcess.pid, "SIGINT");
      }
      this.deleteDirFiles();
    },
    uploadFiles(files) {
      files.forEach((file) => {
        const filePath = path.join(this.filesDirectory, file.name);

        const reader = new FileReader();

        reader.onload = function (event) {
          // Cuando el reader lee un archivo, guarda la info en un buffer, que abajo, se encarga de escribirlo en la ruta especifica.....
          const data = Buffer.from(event.target.result);

          // Aquí se escriben los archivos en la ruta
          fs.writeFile(filePath, data, (err) => {
            if (err) {
              console.error(`Error al escribir el archivo ${file.name}:`, err);
            }
          });
        };

        reader.onerror = function (event) {
          console.error("Error al leer el archivo:", event);
        };

        // Comienza a leer el archivo
        reader.readAsArrayBuffer(file);
      });
    },
    deleteDirFiles() {
      fs.readdir(this.filesDirectory, (err, files) => {
        if (err) {
          console.log("Error en funcion deleteDirFiles: " + err);
        }
        files.forEach((file) => {
          fs.unlink(this.filesDirectory + "/" + file, (err) => {
            console.log(err);
          });
        });
      });
    },
    deleteDragDropFiles() {},
    getExactIP() {
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const interfaz of interfaces[name]) {
          //console.log(interfaces);
          const { family, address, internal } = interfaz; //family(si es IPv4 o IPv6) addres(la ip en si) internal(si es interna o no)
          if (family === "IPv4" && !internal) {
            return address;
          }
        }
      }
      return "localhost";
    },
  },
  computed: {
    actionButton() {
      if (this.serverStarted) {
        return "✗";
      }
      return "⚝";
    },
  },
  components: { DragDrop },
};
</script>

<style lang="css" scoped></style>
