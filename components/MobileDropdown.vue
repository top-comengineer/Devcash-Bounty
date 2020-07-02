<template>
  <div class="relative">
    <!-- Sign In Card -->
    <transition name="modalBgTransition">
      <div
        v-if="isModalOpen && !isLoggedIn"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="w-full md:max-w-xl h-full flex flex-row justify-center items-center px-2 pt-16 pb-12"
        >
          <sign-in-card v-on-clickaway="closeModal" :closeModal="closeModal" type="sign" />
        </div>
      </div>
    </transition>
    <button
      :class="[isDropdownOpen ? '-rotate-90' : 'rotate-0']"
      class="flex flex-row items-center transform scale-100 focus:scale-115 hover:scale-115 transition-all ease-out duration-200"
      @click="isDropdownOpen = !isDropdownOpen"
    >
      <Icon class="md:hidden w-8 h-8 transform" type="menu" colorClass="text-c-text" />
    </button>
    <transition name="dropdownTransition">
      <div
        v-if="isDropdownOpen"
        v-on-clickaway="closeDropdown"
        class="text-c-background md:hidden absolute right-0 dropdown mt-4 text-xl font-bold"
      >
        <div
          class="bg-c-text w-full flex flex-col justify-center items-center shadow-xl rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg px-4 py-4"
        >
          <!-- Home -->
          <nuxt-link :to="localePath('index')" v-slot="{  navigate, href, isExactActive  }">
            <a
              @click="navigate"
              :href="href"
              @keydown.esc.exact="isDropdownOpen=false"
              class="hover:bg-c-background-15 focus:bg-c-background-15 w-full flex flex-row py-2 my-1 justify-center items-center transition-all ease-out duration-200 rounded-lg px-4"
            >
              <div class="flex flex-col items-center">
                <div>{{ $t("navigation.home") }}</div>
                <div
                  :class="[isExactActive?'transform scale-x-100':'transform scale-x-0']"
                  class="bg-c-background h-px2 w-full rounded-tl-full rounded-br-full transition-all ease-out duration-200"
                ></div>
              </div>
            </a>
          </nuxt-link>
          <!-- Bounty Platform -->
          <nuxt-link :to="localePath('bountyplatform')" v-slot="{  navigate, href, isActive  }">
            <a
              @keydown.esc.exact="isDropdownOpen=false"
              @click="navigate"
              :href="href"
              class="hover:bg-c-background-15 focus:bg-c-background-15 w-full flex flex-row py-2 my-1 justify-center items-center transition-all ease-out duration-200 rounded-lg px-4"
            >
              <div class="flex flex-col items-center">
                <div>{{ $t("navigation.bountyPlatform") }}</div>
                <div
                  :class="[isActive?'transform scale-x-100':'transform scale-x-0']"
                  class="bg-c-background h-px2 w-full rounded-tl-full rounded-br-full transition-all ease-out duration-200"
                ></div>
              </div>
            </a>
          </nuxt-link>
          <!-- DEX -->
          <!-- <a
            to="/"
            class="hover:bg-c-background-15 focus:bg-c-background-15 cursor-pointer w-full flex flex-row py-2 my-1 justify-center transition-all ease-out duration-200 rounded-lg"
          >{{ $t("navigation.dex") }}</a>-->
          <!-- Theme Switch -->
          <button
            @keydown.esc.exact="isDropdownOpen=false"
            @keydown.tab.exact="isLoggedIn?isDropdownOpen=false:null"
            @click="changeTheme"
            class="hover:bg-c-background-15 focus:bg-c-background-15 w-full flex flex-row py-2 my-1 justify-center items-center transition-all ease-out duration-200 rounded-lg"
          >
            <Icon
              class="w-6 h-6 mr-1"
              colorClass="text-c-background"
              :type="$store.state.theme == 'dark' ? 'light' : 'dark'"
            />
            <div
              class="text-xl font-bold"
            >{{ $store.state.theme == 'dark' ? $t("theme.light") : $t("theme.dark") }}</div>
          </button>
          <!-- Sign In Button -->
          <button
            @keydown.esc.exact="isDropdownOpen=false"
            @keydown.tab.exact="isDropdownOpen=false"
            v-if="!isLoggedIn"
            @click.prevent="isDropdownOpen=false;isModalOpen=true"
            class="bg-c-background text-c-text w-full font-bold hover:bg-c-primary hover:text-c-light focus:bg-c-primary focus:text-c-light transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-2 my-2"
          >{{ $t("navigation.signIn") }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import SignInCard from "~/components/BountyPlatform/SignInCard.vue";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  components: {
    Icon,
    SignInCard
  },
  props: {
    isLoggedIn: Boolean,
    loggingInLoading: Boolean
  },
  data() {
    return {
      isDropdownOpen: false,
      isModalOpen: false
    };
  },
  methods: {
    changeTheme() { 
      this.$store.commit('changeTheme', this.$store.state.theme == 'dark' ? 'light' : 'dark');
      this.isDropdownOpen=false
      this.$root.$emit('themeChanged')
    },
    closeDropdown(){
      this.isDropdownOpen = false
    },
    closeModal(){
      this.isModalOpen = false
    }
  },
  head(){
    return {
      bodyAttrs: {
        class: [ this.isModalOpen? 'overflow-hidden':'']
      }
    }
  },
};
</script>
<style>
.dropdown {
  width: calc(100vw - 2rem);
  transform-origin: right top;
}
.dropdownTransition-enter-active {
  transition: all 0.25s ease-out;
}
.dropdownTransition-leave-active {
  transition: all 0.25s ease-out;
}
.dropdownTransition-enter {
  opacity: 0;
  transform: scaleX(0.25) scaleY(0.5) rotate(2.5deg) translateY(-4rem);
}
.dropdownTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.25) scaleY(0.5) rotate(2.5deg) translateY(-4rem);
}
</style>
