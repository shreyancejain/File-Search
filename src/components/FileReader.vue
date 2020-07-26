<template>
  <div>
    <md-field class="">
      <label>Read File</label>
      <md-file accept="text/plain" @md-change="loadTextFromFile" />
    </md-field>
  </div>
</template>

<script>
import Vue from "vue";
import { MdButton, MdField } from "vue-material/dist/components";
Vue.use(MdButton);
Vue.use(MdField);
export default {
  name: "FileReader",
  methods: {
    loadTextFromFile(files) {
      const file = files[0];
      if (!file || file.type !== "text/plain") {
        this.$emit("load", "");
        return;
      }
      const reader = new FileReader();
      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
    }
  }
};
</script>

<style></style>
