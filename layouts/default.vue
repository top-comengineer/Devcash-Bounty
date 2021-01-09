<template>
  <div
    class="bg-c-background text-c-text transition-colors ease-out duration-200 relative overflow-anywhere"
    :class="['bg-c-background', `theme-${this.$store.state.theme}`]"
  >
    <div class="w-full flex flex-row justify-center relative z-50">
      <div class="fixed w-full">
        <div class="d-container relative">
          <Navbar
            :hideModals="hideNavbar"
            id="navbar"
            class="transition-all ease-out duration-200 rounded-bl-xl rounded-br-xl"
            :class="[
              hideNavbar ? '-mt-24' : 'mt-0', {'bg-c-background-sec shadow-xl': showNavbarBg}
            ]"
          />
          <!-- Notification -->
          <div
            :class="hideNavbar?'mt-12 md:mt-10 lg:mt-8':'mt-2'"
            class="absolute right-0 px-4 md:px-6 lg:px-10"
          >
            <notifications
              group="main"
              position="top right"
              :duration="6000"
              animation-type="css"
              :max="6"
            >
              <template slot="body" slot-scope="props">
                <div
                  class="flex flex-row items-start justify-between bg-c-light text-c-dark mb-2 shadow-2xl border-l-8 border-c-secondary rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-2xl relative"
                >
                  <nuxt-link
                    v-if="props.item.data.href"
                    :to="props.item.data.href || '/nil'"
                    class="flex flex-row"
                  >
                    <div class="flex flex-col justify-center mx-3 my-2">
                      <p class="text-sm font-bold">{{props.item.title}}</p>
                      <p class="text-xs" v-html="props.item.text"></p>
                    </div>
                  </nuxt-link>
                  <div
                    @click="props.close"
                    v-else
                    class="flex flex-col justify-center mx-3 my-2 cursor-pointer"
                  >
                    <p class="text-sm font-bold">{{props.item.title}}</p>
                    <p class="text-xs" v-html="props.item.text"></p>
                  </div>
                  <button
                    class="hover:bg-c-primary-35 focus:bg-c-primary-35 p-1 rounded-full transition-colors duration-200 mr-0_5 mt-0_5"
                    @click="props.close"
                  >
                    <Icon class="w-4 h-4" type="cancel" colorClass="text-c-dark" />
                  </button>
                </div>
              </template>
            </notifications>
          </div>
        </div>
      </div>
    </div>
    <nuxt v-if="!$slots.default" />
    <slot />
    <Footer />
    <!-- Optional IBO bar below -->
    <IBOBar :devDistributed="4000000" :devTotalToDistribute="140000000" />
  </div>
</template>
<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import Icon from "~/components/Icon.vue";
import IBOBar from "~/components/IBOBar.vue";
import Vue from 'vue'

// Optional IBO bar below
// import IBOBar from "~/components/IBOBar.vue";
export default {
  components: {
    Navbar,
    Footer,
    Icon,
    // Optional IBO bar below
    IBOBar
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
  },
  data: function() {
    return {
      scrollPos: 0,
      showNavbarBg: false,
      hideNavbar: false,
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
      if (window.pageYOffset >= 15 && !this.showNavbarBg) {
        this.showNavbarBg = true;
      } else if (window.pageYOffset < 15 && this.showNavbarBg) {
        this.showNavbarBg = false;
      }
    },
  },
  beforeMount() {
    this.navbarScroll();
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
}
.overflow-anywhere {
  overflow-wrap: anywhere;
}
.vue-notification-group {
  position: relative !important;
}
.vue-notification-wrapper {
  overflow: visible !important;
}
</style>
