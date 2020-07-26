<template>
  <div>
    <md-card>
      <md-card-header>
        <div style="display:flex">
          <md-field>
            <label>Search</label>
            <md-input v-model="query" v-on:input="queryUpdated()"></md-input>
            <span class="md-helper-text"
              >Type here to search text in File!</span
            >
          </md-field>
          <div v-if="query" class="search-count">Count: {{ count }}</div>
        </div>
      </md-card-header>

      <md-card-content>
        <span
          v-for="(textObj, idx) in highlightText"
          :key="idx"
          v-bind:class="textObj.highlight && 'highlightText'"
        >
          {{ textObj.val }}
        </span>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import Vue from "vue";
import { MdField, MdContent, MdCard } from "vue-material/dist/components";
Vue.use(MdContent, MdCard, MdField);
export default {
  name: "SearchWord",
  props: {
    content: String
  },
  data() {
    return {
      query: "",
      count: 0,
      highlightText: []
    };
  },
  watch: {
    content: function() {
      this.reset();
    }
  },
  created() {
    this.reset();
  },

  methods: {
    reset() {
      this.query = "";
      this.count = 0;
      this.highlightText = [
        {
          val: this.content,
          highlight: false
        }
      ];
    },
    queryUpdated() {
      if (!this.query) {
        return this.reset();
      }
      this.highlightText = [];
      let indices = [];
      let index = 0;
      while (index >= 0) {
        index = this.content.indexOf(this.query, index);
        if (index >= 0) {
          let start = index;
          let end = index + this.query.length;
          index = end;
          indices.push({ start, end });
        }
      }
      let lastIdx = 0;
      indices.forEach(({ start, end }) => {
        let val = this.content.substring(lastIdx, start);
        if (val) {
          this.highlightText.push({
            val,
            highlight: false
          });
        }
        val = this.content.substring(start, end);
        this.highlightText.push({
          val,
          highlight: true
        });
        lastIdx = end;
      });
      if (lastIdx < this.content.length) {
        this.highlightText.push({
          val: this.content.substring(lastIdx, this.content.length),
          highlight: false
        });
      }
      this.count = indices.length;
    }
  }
};
</script>

<style>
.highlightText {
  background-color: #fff2ac;
  background-image: linear-gradient(to right, #ffe359 0%, #fff2ac 100%);
  font-size: 16px;
}
.search-count {
  min-width: 100px;
  display: flex;
  justify-content: center;
  margin: 20px 16px 0 16px;
}
</style>
