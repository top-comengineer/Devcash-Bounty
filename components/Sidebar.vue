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
      <nuxt-link :to="getLocalizedRoute('bountyplatform')">
        <div
          class="bg-dtPrimary sidebar-tab py-3 lg:px-8 xl:px-10 text-2xl font-bold flex flex-row justify-center lg:justify-start items-center text-dtText"
        >
          <Icon type="explore" class="w-7 h-7 text-dtText" />
          <h3 class="hidden lg:block transition-0 ml-2">{{ $t("bountyPlatform.explore.header") }}</h3>
        </div>
      </nuxt-link>
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform/post')"
        class="tab-active py-3 lg:px-8 xl:px-10 text-2xl font-bold flex flex-row justify-center lg:justify-start items-center text-dtText"
      >
        <Icon type="post" class="w-7 h-7 text-dtText" />
        <h3 class="hidden lg:block transition-0 ml-2">{{ $t("bountyPlatform.post.header") }}</h3>
      </nuxt-link>
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
.sidebar-tab {
  background-color: transparent !important;
  transition: all 0.2s ease-out;
}
.nuxt-link-exact-active > .sidebar-tab {
  background-color: #675cff;
}
</style>
