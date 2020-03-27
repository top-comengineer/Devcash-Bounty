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
              'bg-dtBackground': $store.state.theme.dt && showNavBg,
              'bg-ltBackground': !$store.state.theme.dt && showNavBg
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
  data: function() {
    return {
      scrollPos: 0,
      showNavBg: false
    };
  },
  methods: {
    navbarScroll() {
      // Detects new state and compares it with the new one
      if (
        window.pageYOffset < 50 ||
        document.body.getBoundingClientRect().top > this.scrollPos + 10
      ) {
        defaultNavbar.style.marginTop = "0rem";
      } else if (
        window.pageYOffset >= 100 &&
        document.body.getBoundingClientRect().top < this.scrollPos - 10
      ) {
        defaultNavbar.style.marginTop = "-6rem";
      }
      // Saves the new position for iteration.
      this.scrollPos = document.body.getBoundingClientRect().top;

      // navbar shadow
      if (
        window.pageYOffset >= 50 &&
        !this.showNavBg
      ) {
        this.showNavBg = true
        defaultNavbar.classList.add("shadow-lg");
      } else if (
        window.pageYOffset < 50 &&
        this.showNavBg
      ) {
        this.showNavBg = false
        defaultNavbar.classList.remove("shadow-lg");
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
