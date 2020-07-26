<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <h3 class="md-title">File Search</h3>
    </md-toolbar>
    <FileReader v-on:load="fileContent = $event"></FileReader>
    <SearchWord v-if="fileContent" v-bind:content="fileContent"></SearchWord>
  </div>
</template>

<script>
//Polyfilling escape method, to escape regexp special characters
if (!RegExp.escape) {
  RegExp.escape = function(s) {
    return String(s).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  };
}
import FileReader from "./components/FileReader";
import SearchWord from "./components/SearchWord";
import Vue from "vue";
import { MdCard, MdToolbar } from "vue-material/dist/components";

Vue.use(MdCard);
Vue.use(MdToolbar);

export default {
  name: "App",
  data: () => ({
    fileContent: ""
  }),
  components: {
    FileReader,
    SearchWord
  }
};
</script>

<style lang="scss">
#app {
  padding: 20px;
}
</style>
