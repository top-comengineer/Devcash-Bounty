<template>
  <div
    class="w-full flex flex-row justify-between items-center px-4 py-4 md:px-8 md:py-6 absolute"
  >
    <Logo
      class="w-32 md:w-40 h-auto"
      :type="$store.state.theme.dt ? 'light' : 'dark'"
    />
    <!-- Menu icon shown on small screens -->
    <Icon
      class="md:hidden w-8 h-8 mb-1"
      type="menu"
      :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
    />
    <!-- Navbar items shown on non-small screens -->
    <div class="hidden md:flex flex-row justify-end items-center">
      <div class="ml-8 font-bold">
        <nuxt-link to="/">{{ $t("navigation.home") }}</nuxt-link>
      </div>
      <div class="ml-8 font-bold">
        <nuxt-link to="bountyplatform">{{
          $t("navigation.bountyPlatform")
        }}</nuxt-link>
      </div>
      <div class="ml-8 font-bold">{{ $t("navigation.dex") }}</div>
      <div class="ml-8 font-bold">{{ $t("navigation.english") }}</div>
      <!-- Theme Switcher Button -->
      <button @click="$store.commit('theme/change')" class="ml-8 rounded-full">
        <Icon
          class="w-8 h-8"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          :type="$store.state.theme.dt ? 'dark' : 'light'"
        />
      </button>
      <!-- Sign In Button -->
      <button
        v-bind:class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground'
            : ' bg-ltText text-ltBackground'
        ]"
        class="ml-8 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
      >
        {{ $t("navigation.signIn") }}
      </button>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Logo,
    Icon
  }
};
</script>
