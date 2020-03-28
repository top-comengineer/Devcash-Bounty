<template>
  <div
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
    class="w-full h-full rounded-bl-sm rounded-tl-sm rounded-br-3xl rounded-tr-3xl lg:rounded-tl-xl lg:rounded-bl-xl transition-all ease-out duration-200"
  >
    <!-- Sidebar Content -->
    <div class="w-full flex flex-col py-8">
      <button
        class="bg-dtPrimary py-3 text-2xl font-bold flex flex-row justify-center items-center text-dtText"
      >
        <Icon type="explore" class="w-7 h-7 lg:mr-1 text-dtText" />
        <h3 class="hidden lg:block">{{ $t("bountyPlatform.explore.header") }}</h3>
      </button>
      <button class="py-3 text-2xl font-bold flex flex-row justify-center items-center">
        <Icon
          type="create"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          class="w-7 h-7 lg:mr-1"
        />
        <h3 class="hidden lg:block">{{ $t("bountyPlatform.create.header") }}</h3>
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
</style>
