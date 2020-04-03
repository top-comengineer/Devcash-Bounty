<template>
  <DefaultLayout>
    <div class="w-full flex flex-col md:flex-row justify-center relative py-20 md:py-24">
      <!-- Sidebar container -->
      <div
        class="sidebar-spacer-left fixed bottom-0 md:bottom-auto md:relative flex flex-row justify-end mr-2 md:mr-4 transition-all ease-out duration-200 z-10"
      >
        <!-- Sidebar -->
        <div class="sidebar-container sticky md:pt-2 md:pb-2 transition-all ease-out duration-200">
          <Sidebar class="overflow-scroll" />
        </div>
      </div>
      <!-- Centered, Page Content -->
      <div class="d-container-2 px-2 md:px-0">
        <nuxt />
      </div>
      <!-- Right spacer -->
      <div class="mr-2 md:mr-4 sidebar-spacer-right"></div>
    </div>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from "~/layouts/default.vue";
import Sidebar from "~/components/BountyPlatform/Sidebar.vue";
export default {
  components: {
    DefaultLayout,
    Sidebar
  }
};
</script>
<style>
.sidebar-container {
  width: 100%;
  height: auto;
  overflow: visible;
  top: 5rem;
}
@media only screen and (min-width: 768px) {
  .sidebar-container {
    width: 4rem;
    height: calc(100vh - 7rem);
    min-width: 4rem;
    max-width: 4rem;
    top: 6rem;
  }
}
@media only screen and (min-width: 1024px) {
  .sidebar-container {
    width: calc((100vw - 1280px) / 2);
    max-width: 20rem;
    min-width: 15rem;
  }
}
.sidebar-spacer-right {
  width: calc((100vw - 1280px) / 2);
}
.sidebar-spacer-left {
  width: 100%;
  min-width: 3rem;
}
@media only screen and (min-width: 768px) {
  .sidebar-spacer-left {
    width: calc((100vw - 1280px) / 2);
    min-width: 4rem;
  }
}
@media only screen and (min-width: 1024px) {
  .sidebar-spacer-left {
    min-width: 15rem;
  }
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
