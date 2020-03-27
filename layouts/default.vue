<template>
  <div
    class="transition-all ease-out duration-200"
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
            :class="{
              'bg-dtBackground': $store.state.theme.dt && showNavbarShadow,
              'bg-ltBackground': !$store.state.theme.dt && showNavbarShadow,
              'shadow-lg': showNavbarShadow,
              'mt-0' : showNavbar,
              '-mt-24': !showNavbar
            }"
          />
        </div>
      </div>
    </div>
    <nuxt />
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
      showNavbar: true
    };
  },
  methods: {
    navbarScroll() {
      // Detects new state and compares it with the new one
      if (
        window.pageYOffset < 50 ||
        document.body.getBoundingClientRect().top > this.scrollPos + 10
      ) {
        this.showNavbar = true;
      } else if (
        window.pageYOffset >= 100 &&
        document.body.getBoundingClientRect().top < this.scrollPos - 10
      ) {
        this.showNavbar = false;
      }
      // Saves the new position for iteration.
      this.scrollPos = document.body.getBoundingClientRect().top;

      // navbar shadow
      if (window.pageYOffset >= 50 && !this.showNavBg) {
        this.showNavbarShadow = true;
      } else if (window.pageYOffset < 50 && this.showNavbarShadow) {
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
