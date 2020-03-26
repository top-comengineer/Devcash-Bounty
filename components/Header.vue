<template>
  <div class="w-full flex flex-row justify-between items-center px-4 py-4 md:px-8 md:py-6 absolute">
    <Logo />
    <!-- Menu icon shown on small screens -->
    <Icon class="md:hidden" type="menu" widthClass="w-8" />
    <!-- Navbar items shown on non-small screens -->
    <ul class="hidden md:flex flex-row justify-end items-center">
      <li class="ml-8 font-bold">
        <nuxt-link to="/">{{ $t("navigation.home") }}</nuxt-link>
      </li>
      <li class="ml-8 font-bold">
        <nuxt-link to="bountyplatform">{{ $t("navigation.bountyPlatform") }}</nuxt-link>
      </li>
      <li class="ml-8 font-bold">{{ $t("navigation.dex") }}</li>
      <li class="ml-8 font-bold">{{ $t("navigation.english") }}</li>
      <li class="ml-8 font-bold">
        <button
          class="bg-dtText text-dtBg font-bold rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
        >{{ $t("navigation.signIn") }}</button>
      </li>
    </ul>
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
