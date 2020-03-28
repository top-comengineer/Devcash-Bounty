<template>
  <div click class="relative">
    <button @click="isOpen = !isOpen">
      <Icon
        v-bind:class="[isOpen ? '-rotate-90' : 'rotate-0']"
        class="md:hidden w-8 h-8 transform transition-all ease-out duration-200"
        type="menu"
        :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
      />
    </button>
    <transition name="dropdownTransition">
      <div
        v-bind:class="
          $store.state.theme.dt ? 'text-dtBackground' : 'text-ltBackground'
        "
        v-if="isOpen"
        class="md:hidden absolute right-0 dropdown mt-4 text-xl font-bold"
      >
        <div
          v-bind:class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
          class="w-full flex flex-col justify-center items-center shadow-xl rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg px-4 py-4"
        >
          <!-- Home -->
          <nuxt-link
            :to="getLocalizedRoute('index')"
            class="w-full flex flex-row py-2 my-1 justify-center"
          >{{ $t("navigation.home") }}</nuxt-link>
          <!-- Bounty Platform -->
          <nuxt-link
            to="bountyplatform"
            class="w-full flex flex-row py-2 my-1 justify-center"
          >{{ $t("navigation.bountyPlatform") }}</nuxt-link>
          <!-- DEX -->
          <nuxt-link
            :to="getLocalizedRoute('bountyplatform')"
            class="w-full flex flex-row py-2 my-1 justify-center"
          >{{ $t("navigation.dex") }}</nuxt-link>
          <!-- Language -->
          <button
            class="w-full flex flex-row py-2 my-1 justify-center text-xl font-bold"
          >{{ $t("navigation.english") }}</button>
          <!-- Theme Switch -->
          <button
            @click="$store.commit('theme/change'); isOpen=false"
            class="w-full flex flex-row py-2 my-1 justify-center items-center"
          >
            <Icon
              class="w-6 h-6 mr-1"
              :colorClass="
                $store.state.theme.dt
                  ? 'text-dtBackground'
                  : 'text-ltBackground'
              "
              :type="$store.state.theme.dt ? 'dark' : 'light'"
            />
            <div
              class="text-xl font-bold"
            >{{ $store.state.theme.dt ? $t("theme.dark") : $t("theme.light") }}</div>
          </button>
          <!-- Sign In Button -->
          <button
            v-bind:class="[
              $store.state.theme.dt
                ? 'bg-dtBackground text-dtText'
                : ' bg-ltBackground text-ltText'
            ]"
            class="w-full font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-2 my-2"
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
}
.dropdownTransition-enter-active {
  transition: all 0.25s ease-out;
  transform-origin: right top;
}
.dropdownTransition-leave-active {
  transition: all 0.25s ease-out;
  transform-origin: right top;
}
.dropdownTransition-enter {
  opacity: 0;
  transform: scaleX(0.25) scaleY(0.5) translateY(-2rem);
}
.dropdownTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.25) scaleY(0.5) translateY(-2rem);
}
</style>
