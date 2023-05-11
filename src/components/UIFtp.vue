<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center mt-3">
      <p class="h1 fw-bold text-center">CukiFTP</p>
    </div>
    <div class="row d-flex justify-content-center mb-2">
      <DragDrop></DragDrop>
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
const shell = require("shelljs"); //Para iniciar comandos de shell
const kill = require("tree-kill"); //Para matar procesos padres y hijos
const ip = require("ip");

import DragDrop from "../components/DragDrop.vue";

export default {
  name: "UIFtp",
  mounted() {},
  data() {
    return {
      serverStarted: false,
      serverProcess: undefined,
      ip: ip.address(),
    };
  },
  props: {},
  methods: {
    async automatedStartStopServer() {
      try {
        if (!this.serverStarted) {
          this.startServer();
          this.serverStarted = true;
          //console.log("iniciado");
        } else {
          this.stopServer();
          this.serverStarted = false;
          //console.log("apagado");
        }
      } catch (error) {
        console.error("Error al iniciar o parar el servidor:\n", error);
      }
    },
    startServer() {
      this.serverProcess = shell.exec("npm run server-ftp", { async: true });
    },
    stopServer() {
      if (this.serverProcess) {
        kill(this.serverProcess.pid, "SIGINT");
      }
    },
  },
  computed: {
    actionButton() {
      if (this.serverStarted) {
        return "Apagar Servidor";
      }
      return "Subir Archivos";
    },
  },
  components: { DragDrop },
};
</script>

<style lang="css" scoped></style>
