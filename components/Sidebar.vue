<template>
  <div
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
    class="sidebar my-2 sticky top-24 rounded-tr-xl3 rounded-br-xl3 rounded-tl-xl rounded-bl-xl mr-4"
  ></div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Icon
  },
  props: {
    bountyName: null
  },
  data: function() {
    return {};
  }
};
</script>
<style>
.sidebar {
  width: calc((100vw - 1280px) / 2);
  max-width: 20rem;
  min-width: 15rem;
  height: calc(100vh - 7rem);
}
</style>
