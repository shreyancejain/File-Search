<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <h3 class="md-title">File Search</h3>
    </md-toolbar>
    <FileReader v-on:load="fileContent = $event"></FileReader>
    <SearchWord v-bind:content="fileContent"></SearchWord>
  </div>
</template>

<script>
import FileReader from "./components/FileReader";
import SearchWord from "./components/SearchWord";
import Vue from "vue";
import { MdCard, MdToolbar } from "vue-material/dist/components";

Vue.use(MdCard, MdToolbar);
export default {
  name: "App",
  data: () => ({
    fileContent: "dsdsdsdsdsdsd"
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
