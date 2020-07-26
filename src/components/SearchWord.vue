<template>
  <div>
    <md-card>
      <md-card-header>
        <md-switch v-on:change="filterChanged()" v-model="caseSensitive">
          Case Sensitive
        </md-switch>
        <md-switch v-on:change="filterChanged()" v-model="wholeWord">
          Whole Word
        </md-switch>
        <div style="display:flex">
          <md-field>
            <label>Search</label>
            <md-input v-model="query" v-on:input="queryUpdated()"></md-input>
            <span class="md-helper-text"
              >Type here to search text in File!</span
            >
          </md-field>
          <md-content v-if="query" class="md-primary search-count"
            >Count: {{ count }}</md-content
          >
        </div>
      </md-card-header>

      <md-card-content style="font-size: 16px;">
        <!-- eslint-disable-next-line prettier/prettier -->
        <pre><span v-for="(textObj, idx) in highlightText" :key="idx" v-bind:class="textObj.highlight && 'highlightText'">{{textObj.val}}</span></pre>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import Vue from "vue";
import {
  MdField,
  MdContent,
  MdCard,
  MdSwitch
} from "vue-material/dist/components";
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdSwitch);

export default {
  name: "SearchWord",
  props: {
    content: String
  },
  data() {
    return {
      query: "",
      wholeWord: true,
      caseSensitive: true,
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
    filterChanged() {
      if (this.query) {
        this.queryUpdated();
      }
    },
    queryUpdated() {
      if (!this.query) {
        return this.reset();
      }
      this.highlightText = [];
      let indices = getMatchIndices(
        this.query,
        this.content,
        this.caseSensitive,
        this.wholeWord
      );
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

function getMatchIndices(query, str, caseSensitive = false, wholeWord = false) {
  let match,
    queryLen = query.length,
    indices = [],
    flag = "ig";

  if (caseSensitive) {
    flag = "g";
  }
  query = RegExp.escape(query);

  if (wholeWord) {
    query = `\\b${query}\\b`;
  }
  query = new RegExp(query, flag);

  while ((match = query.exec(str))) {
    let start = match.index;
    let end = start + queryLen;
    indices.push({ start, end });
  }
  return indices;
}
</script>

<style>
.highlightText {
  background-color: #ff5252;
  color: #fff;
}
.search-count {
  min-width: 100px;
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
  margin: 20px 16px 0 16px;
}
</style>
