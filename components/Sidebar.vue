<template>
  <div
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary shadow-nlgSS md:shadow-none'
        : 'bg-ltBackgroundSecondary shadow-nlg md:shadow-xlS'
    ]"
    class="w-full h-full rounded-tl-xl rounded-tr-xl md:rounded-tr-3xl md:rounded-bl-sm md:rounded-tl-sm md:rounded-br-3xl lg:rounded-tl-xl lg:rounded-bl-xl transition-all ease-out duration-200"
  >
    <!-- Sidebar Content -->
    <div class="w-full flex flex-row md:flex-col justify-center py-0 md:py-8">
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform')"
        v-slot="{  navigate, href, isExactActive  }"
      >
        <a
          @click="navigate"
          :href="href"
          v-bind:class="[{
            'bg-dtPrimary text-dtText': isExactActive
          }] "
          class="flex flex-row justify-center lg:justify-start items-center text-2xl font-bold px-3 py-3 lg:px-8 xl:px-10 transition-colors ease-out duration-200"
        >
          <Icon
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            type="explore"
            class="w-7 h-7"
          />
          <h3 class="hidden lg:block duration-0 ml-2">{{ $t("bountyPlatform.explore.header") }}</h3>
        </a>
      </nuxt-link>
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-post')"
        v-slot="{ navigate, href, isExactActive }"
      >
        <a
          @click="navigate"
          :href="href"
          v-bind:class="[{
            'bg-dtPrimary text-dtText': isExactActive
          }] "
          class="flex flex-row justify-center lg:justify-start items-center text-2xl font-bold px-3 py-3 lg:px-8 xl:px-10"
        >
          <Icon
            type="post"
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            class="w-7 h-7"
          />
          <h3 class="hidden lg:block duration-0 ml-2">{{ $t("bountyPlatform.post.header") }}</h3>
        </a>
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
</style>
