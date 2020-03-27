<template>
  <div
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
    class="sidebar my-2 sticky top-24 rounded-tr-xl3 rounded-br-xl3 rounded-tl-xl rounded-bl-xl mr-4"
  >
    <!-- Sidebar Content -->
    <div class="w-full flex flex-col py-8">
      <button
        class="bg-dtPrimary py-3 text-2xl font-bold flex flex-row justify-center items-center text-dtText"
      >
        <Icon type="explore" class="w-7 h-7 mr-1 text-dtText" />
        {{ $t("bountyPlatform.explore.header") }}
      </button>
      <button
        class="py-3 text-2xl font-bold flex flex-row justify-center items-center"
      >
        <Icon
          type="create"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          class="w-7 h-7 mr-1"
        />
        {{ $t("bountyPlatform.create.header") }}
      </button>
    </div>
  </div>
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
  overflow: scroll;
}
</style>
