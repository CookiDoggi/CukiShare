<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center mt-5">
      <p class="h1 fw-bold text-center">CukiFTP</p>
    </div>
    <div class="row d-flex justify-content-center mb-5">
      <DragDrop></DragDrop>
    </div>
    <div class="row d-flex justify-content-center">
      <button type="button" class="btn btn-primary">Subir Archivos</button>
    </div>
  </div>
</template>

<script>
import DragDrop from "../components/DragDrop.vue";

export default {
  name: "UIFtp",
  created() {},
  data() {
    return {
      dropzoneOptions: {
        url: "https://localhost:8080/",
        thumbnailWidth: 150,
        maxFilesize: 500,
        headers: { "My-Awesome-Header": "header value" },
      },
    };
  },
  props: {},
  methods: {},
  components: { DragDrop },
};
</script>

<style lang="css" scoped></style>
