<template>
  <div
    class="transition-colors ease-out duration-200 break-all"
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackground text-dtText'
        : 'bg-ltBackground text-ltText'
    ]"
  >
    <div class="w-full flex flex-row justify-center relative">
      <div class="fixed w-full z-50">
        <div class="d-container">
          <Navbar
            id="defaultNavbar"
            class="transition-all ease-out duration-200 rounded-bl-xl rounded-br-xl"
            v-bind:class="[
              hideNavbar ? '-mt-24' : 'mt-0',
              {
                'bg-dtBackgroundSecondary': $store.state.theme.dt && showNavbarShadow,
                'bg-ltBackgroundSecondary': !$store.state.theme.dt && showNavbarShadow,
                'shadow-xlS': $store.state.theme.dt && showNavbarShadow,
                'shadow-xl': !$store.state.theme.dt && showNavbarShadow
              }
            ]"
          />
        </div>
      </div>
    </div>
    <nuxt v-if="!$slots.default" />
    <slot />
    <Footer />
  </div>
</template>
<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.theme.dt
          ? "bg-dtBackground"
          : "bg-ltBackground"
      },
      htmlAttrs: {
        lang: this.$store.state.i18n.currentLocale
      }
    };
  },
  data: function() {
    return {
      scrollPos: 0,
      showNavbarShadow: false,
      hideNavbar: false
    };
  },
  methods: {
    navbarScroll() {
      // Detects new state and compares it with the new one
      if (
        window.pageYOffset < 50 ||
        document.body.getBoundingClientRect().top > this.scrollPos + 10
      ) {
        this.hideNavbar = false;
      } else if (
        window.pageYOffset >= 100 &&
        document.body.getBoundingClientRect().top < this.scrollPos - 10
      ) {
        this.hideNavbar = true;
      }
      // Saves the new position for iteration.
      this.scrollPos = document.body.getBoundingClientRect().top;

      // navbar shadow
      if (window.pageYOffset >= 20 && !this.showNavbarShadow) {
        this.showNavbarShadow = true;
      } else if (window.pageYOffset < 20 && this.showNavbarShadow) {
        this.showNavbarShadow = false;
      }
    }
  },
  mounted() {
    // Adding scroll event
    window.addEventListener("scroll", this.navbarScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.navbarScroll);
  }
};
</script>
<style>
body {
  font-family: "Manrope", sans-serif;
  font-weight: 400;
  background-color: #010014;
}
</style>
