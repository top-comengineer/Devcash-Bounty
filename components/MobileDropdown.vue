<template>
  <div click class="relative">
    <button
      :class="[isOpen ? '-rotate-90' : 'rotate-0']"
      class="flex flex-row items-center transform scale-100 focus:scale-115 hover:scale-115 transition-all ease-out duration-200"
      @click="isOpen = !isOpen"
      @blur="isOpen=false"
    >
      <Icon class="md:hidden w-8 h-8 transform" type="menu" colorClass="text-c-text" />
    </button>
    <transition name="dropdownTransition">
      <div
        v-if="isOpen"
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
          <nuxt-link
            :to="localePath('bountyplatform')"
            v-slot="{  navigate, href, isExactActive  }"
          >
            <a
              @click="navigate"
              :href="href"
              class="hover:bg-c-background-15 focus:bg-c-background-15 w-full flex flex-row py-2 my-1 justify-center items-center transition-all ease-out duration-200 rounded-lg px-4"
            >
              <div class="flex flex-col items-center">
                <div>{{ $t("navigation.bountyPlatform") }}</div>
                <div
                  :class="[isExactActive?'transform scale-x-100':'transform scale-x-0']"
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
            @click="$store.commit('changeTheme', $store.state.theme == 'dark' ? 'light' : 'dark'); isOpen=false"
            class="hover:bg-c-background-15 focus:bg-c-background-15 w-full flex flex-row py-2 my-1 justify-center items-center transition-all ease-out duration-200 rounded-lg rounded-lg"
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
            class="bg-c-background text-c-text w-full font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-2 my-2"
          >{{ $t("navigation.signIn") }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Icon
  },
  data: function() {
    return {
      isOpen: false
    };
  }
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
