<template>
  <div class="w-full flex flex-row justify-between items-center px-4 py-4 md:px-8 md:py-6">
    <nuxt-link :to="getLocalizedRoute('index')">
      <Logo class="md:mb-0 w-32 md:w-40 h-auto" :type="$store.state.theme.dt ? 'light' : 'dark'" />
    </nuxt-link>
    <!-- Menu icon shown on small screens -->
    <MobileDropdown />
    <!-- Navbar items shown on non-small screens -->
    <div class="hidden md:flex flex-row justify-end items-center">
      <div class="ml-8 font-bold">
        <nuxt-link :to="getLocalizedRoute('index')">{{ $t("navigation.home") }}</nuxt-link>
      </div>
      <div class="ml-8 font-bold">
        <nuxt-link :to="getLocalizedRoute('bountyplatform')">
          {{
          $t("navigation.bountyPlatform")
          }}
        </nuxt-link>
      </div>
      <div class="ml-8 font-bold">{{ $t("navigation.dex") }}</div>
      <div class="ml-8 font-bold">{{ $t("navigation.english") }}</div>
      <!-- Theme Switcher Button -->
      <button @click="toggleThemes" class="ml-8 rounded-full">
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
      >{{ $t("navigation.signIn") }}</button>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
import MobileDropdown from "~/components/MobileDropdown.vue";
export default {
  components: {
    Logo,
    Icon,
    MobileDropdown
  },
  methods: {
    toggleThemes() {
      if (this.$store.state.theme.dt) {
        document.querySelector("body").style.backgroundColor = "#F8F7FC";
        if (defaultNavbar.classList.contains("bg-dtBackground")) {
          defaultNavbar.classList.remove("bg-dtBackground");
          defaultNavbar.classList.add("bg-ltBackground");
        }
      } else {
        document.querySelector("body").style.backgroundColor = "#010014";
        if (defaultNavbar.classList.contains("bg-ltBackground")) {
          defaultNavbar.classList.remove("bg-ltBackground");
          defaultNavbar.classList.add("bg-dtBackground");
        }
      }
      this.$store.commit("theme/change");
    }
  }
};
</script>
