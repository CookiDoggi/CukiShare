<template>
  <div class="main">
    <!--zona de drag&drop-->

    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png,.txt,.zip,.rar,.ico"
      />
      <label v-if="files.length == 0" for="fileInput" class="file-label">
        <div v-if="isDragging">Suelta para subir tus archivos.</div>
        <div v-else><u>Pulsa</u> o suelta tus archivos aquí.</div>
      </label>

      <!-- Mostrar nombres-->

      <div class="preview-container mt-4" v-if="files.length == 1">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div>
            <p>
              {{ file.name }}
            </p>
          </div>
          <div>
            <button
              class="btn btn-primary btn-sm ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
            >
              <b>✘</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "drag-drop",
  created() {},
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  props: {},
  methods: {
    onChange() {
      //también envía los archivos al padre
      this.files = [...this.$refs.file.files];
      this.$emit("recieve-files", this.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
  },
};
</script>

<style scoped src="@/assets/dragdrop.css"></style>
