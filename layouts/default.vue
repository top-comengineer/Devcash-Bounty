<template>
  <div
    class="transition-colors ease-out duration-200 relative overflow-anywhere"
    :class="[
      $store.state.theme.dt
        ? 'bg-dtBackground text-dtText'
        : 'bg-ltBackground text-ltText'
    ]"
  >
    <div class="w-full flex flex-row justify-center relative">
      <div class="fixed w-full z-50">
        <div class="d-container relative">
          <Navbar
            id="defaultNavbar"
            class="transition-all ease-out duration-200 rounded-bl-xl rounded-br-xl"
            :class="[
              hideNavbar ? '-mt-24' : 'mt-0',
              {
                'bg-dtBackgroundSecondary': $store.state.theme.dt && showNavbarBg,
                'bg-ltBackgroundSecondary': !$store.state.theme.dt && showNavbarBg,
                'shadow-xlS': $store.state.theme.dt && showNavbarBg,
                'shadow-xl': !$store.state.theme.dt && showNavbarBg
              }
            ]"
          />
          <!-- Notification -->
          <div class="absolute right-0 px-4 md:px-6 lg:px-10 mt-2">
            <notifications
              group="main"
              position="top right"
              :duration="4000"
              animation-type="css"
              :max="6"
            >
              <template slot="body" slot-scope="props">
                <div
                  class="flex flex-row justify-between items-start bg-dtText text-dtBackground mb-2 shadow-xlS border-l-8 border-dtSecondary rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-2xl"
                >
                  <div class="flex flex-col justify-center mx-3 my-2">
                    <p class="text-sm font-bold">{{props.item.title}}</p>
                    <p class="text-xs" v-html="props.item.text"></p>
                  </div>
                  <div class="flex flex-row justify-end">
                    <button
                      class="hover_bg-dtBackground-15 focus_bg-dtBackground-15 p-1 rounded-full transition-colors duration-200 mr-0_5 mt-0_5"
                      @click="props.close"
                    >
                      <Icon class="w-4 h-4" type="cancel" colorClass="text-dtBackground" />
                    </button>
                  </div>
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
    <!-- <IBOBar :devDistributed="231231" :devTotalToDistribute="1231231" /> -->
  </div>
</template>
<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import Icon from "~/components/Icon.vue";
import Vue from 'vue'
import Notifications from 'vue-notification/dist/ssr.js'
Vue.use(Notifications)
// Optional IBO bar below
// import IBOBar from "~/components/IBOBar.vue";
export default {
  components: {
    Navbar,
    Footer,
    Icon
    // Optional IBO bar below
    // IBOBar
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
      bodyAttrs: {
        class: ['bg-c-background', !this.$store.state.theme.dt?'theme-light':'']
      },
      link: [
        ...i18nSeo.link
      ]
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
    showNotification(){
      this.$notify({
        group: 'main',
        title: 'You’ve received a new submission!',
        text: 'Click this notification to see the details.'
      });
    }
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
  background-color: #010014;
}
.overflow-anywhere {
  overflow-wrap: anywhere;
}
</style>
