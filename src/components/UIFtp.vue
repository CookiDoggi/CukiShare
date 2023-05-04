<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center mt-5">
      <p class="h1 fw-bold text-center">CukiFTP</p>
    </div>
    <div class="row d-flex justify-content-center my-5">
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
      ></vue-dropzone>
    </div>
    <div class="row d-flex justify-content-center">
      <button type="button" class="btn btn-primary">Subir Archivos</button>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

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
  components: {
    vueDropzone: vue2Dropzone,
  },
};
</script>

<style lang="css" scoped></style>
