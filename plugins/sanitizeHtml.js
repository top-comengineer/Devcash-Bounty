import Vue from 'vue'
import VueSanitize from "vue-sanitize";

Vue.use(VueSanitize, {
  allowedTags: ['a', 'h2', 'h1', 'h3', 'pre', 'code', 'p', 'br'],
    allowedAttributes: {
      'a': [ 'href', 'target' ]
    }
});