<template>
  <div click class="relative">
    <button @click="isOpen=!isOpen">
      <Icon
        v-bind:class="[isOpen?'-rotate-90':'rotate-0'] "
        class="md:hidden w-8 h-8 transform transition-all ease-out duration-200"
        type="menu"
        :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
      />
    </button>
    <transition name="dropdownTransition">
      <div v-if="isOpen" class="md:hidden absolute right-0 dropdown mt-2">
        <div
          v-bind:class="[$store.state.theme.dt?'bg-dtText': 'bg-ltText']"
          class="w-full flex flex-col items-center rounded-tl-xl3 rounded-br-xl3 rounded-bl-lg rounded-tr-lg px-4 py-8"
        >
          <button @click="toggleThemes" class="rounded-full">
            <Icon
              class="w-8 h-8"
              :colorClass="$store.state.theme.dt ? 'text-dtBackground' : 'text-ltBackground'"
              :type="$store.state.theme.dt ? 'dark' : 'light'"
            />
          </button>
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
<style>
.dropdown {
  width: calc(100vw - 2rem);
}
.dropdownTransition-enter-active {
  transition: all 0.2s ease-out;
  transform-origin: right top;
}
.dropdownTransition-leave-active {
  transition: all 0.2s ease-out;
  transform-origin: right top;
}
.dropdownTransition-enter {
  opacity: 0;
  transform: scale(0.5) translateY(-2rem);
}
.dropdownTransition-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(-2rem);
}
</style>