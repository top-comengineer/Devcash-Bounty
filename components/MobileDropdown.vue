<template>
  <div class="relative">
    <button @click="isOpen=!isOpen">
      <Icon
        v-bind:class="[isOpen?'-rotate-90':'rotate-0'] "
        class="md:hidden w-8 h-8 mb-1 transform transition-all ease-out duration-200"
        type="menu"
        :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
      />
    </button>
    <div v-if="isOpen" class="md:hidden absolute right-0 dropdown">
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
</style>