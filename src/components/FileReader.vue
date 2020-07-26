<template>
  <div>
    <md-field class="">
      <label>Read File</label>
      <md-file ref="mdfile" accept="text/plain" @md-change="loadTextFromFile" />
    </md-field>
    <md-snackbar
      class="snackbar"
      :md-position="'left'"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
    >
      <span>Please select a Text File!</span>
    </md-snackbar>
  </div>
</template>

<script>
import Vue from "vue";
import { MdButton, MdField, MdSnackbar } from "vue-material/dist/components";
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdSnackbar);

export default {
  name: "FileReader",
  data() {
    return {
      showSnackbar: false
    };
  },
  methods: {
    loadTextFromFile(files) {
      const file = files[0];
      if (!file || file.type !== "text/plain") {
        this.showSnackbar = true;
        this.$refs.mdfile.clearField();
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

<style>
.snackbar {
  background-color: #ff5252 !important;
}
</style>
