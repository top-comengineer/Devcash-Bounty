<template>
  <div
    class="bg-c-background text-c-text transition-colors ease-out duration-200 relative overflow-anywhere min-h-screen flex flex-col justify-between"
    :class="['bg-c-background', `theme-${this.$store.state.theme}`]"
  >
    <div class="d-container">
      <Navbar
        id="navbar"
        class="transition-all ease-out duration-200 rounded-bl-xl rounded-br-xl"
        :class="[hideNavbar ? '-mt-24' : 'mt-0', {'bg-c-background-sec shadow-xl': showNavbarBg}]"
      />
    </div>
    <nuxt v-if="!$slots.default" />
    <slot />
    <Footer />
  </div>
</template>
<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import Vue from 'vue'
export default {
  components: {
    Navbar,
    Footer,
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs
      },
      meta: [
        ...i18nSeo.meta
      ],
      link: [
        ...i18nSeo.link
      ],
      bodyAttrs: {
        class: ['bg-c-background', this.$store.state.theme == 'light' ?'theme-light':'theme-dark']
      },
    };
  }
};
</script>
<style>
body {
  font-family: "Manrope", sans-serif;
  font-weight: 400;
}
.overflow-anywhere {
  overflow-wrap: anywhere;
}
</style>
