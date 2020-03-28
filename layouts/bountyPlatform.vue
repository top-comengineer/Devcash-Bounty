<template>
  <DefaultLayout>
    <div class="w-full flex flex-row justify-center relative my-24">
      <div
        class="sidebarSpacer-2 flex flex-row justify-end transition-all ease-out duration-200"
      >
        <transition name="sidebarTransition">
          <Sidebar v-if="show" />
        </transition>
      </div>
      <div class="px-2"></div>
      <div class="d-container-2">
        <nuxt />
      </div>
      <div class="sidebarSpacer"></div>
    </div>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from "~/layouts/default.vue";
import Sidebar from "~/components/Sidebar.vue";
export default {
  components: {
    DefaultLayout,
    Sidebar
  },
  data() {
    return {
      show: false
    };
  },
  mounted: function() {
    this.show = true;
    /*
    DevcashBounty.init().then((result) => {

    });*/
  }
};
</script>
<style>
.sidebarSpacer {
  width: calc((100vw - 1280px) / 2);
}
.sidebarSpacer-2 {
  width: calc((100vw - 1280px) / 2);
  min-width: 5rem;
}
@media only screen and (min-width: 1024px) {
  .sidebarSpacer-2 {
    min-width: 15rem;
  }
}
.top-24 {
  top: 6rem;
}
.sidebarTransition-enter-active {
  transition: all 0.2s ease-out;
  transform-origin: right top;
}
.sidebarTransition-leave-active {
  transition: all 0.2s ease-out;
  transform-origin: right top;
}
.sidebarTransition-enter {
  opacity: 0;
  transform: translateX(-20rem);
}
.sidebarTransition-leave-to {
  opacity: 0;
  transform: translateX(-20rem);
}
</style>
