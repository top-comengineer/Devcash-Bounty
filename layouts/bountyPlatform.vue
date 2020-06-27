<template>
  <DefaultLayout>
    <div class="w-full flex flex-col md:flex-row justify-center relative py-20 md:py-24 z-20">
      <!-- Sidebar container -->
      <div
        class="sidebar-spacer-left fixed bottom-0 md:bottom-auto md:top-0 md:relative flex flex-row justify-end transition-all ease-out duration-200 md:mb-2"
      >
        <!-- Sidebar -->
        <div class="sidebar-container overflow-visible sticky transition-all ease-out duration-200">
          <div class="sidebar-container-inner md:absolute md:left-0">
            <Sidebar
              class="overflow-y-auto overflow-x-hidden md:absolute md:left-0 shadow-4xl md:shadow-xl md:hover:shadow-4xl lg:hover:shadow-lg transition-shadow ease-out duration-300"
            />
          </div>
        </div>
      </div>
      <!-- Centered, Page Content -->
      <div class="d-container-2 px-2 md:px-0 ">
        <nuxt keep-alive />
      </div>
      <!-- Right spacer -->
      <div class="sidebar-spacer-right"></div>
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
.sidebar-container-inner {
  width: 100%;
  height: 100%;
  transition: all 200ms ease-out;
}
@media only screen and (min-width: 768px) {
  .sidebar-container-inner:hover {
    width: 16rem;
  }
  .sidebar-container-inner:hover .sidebar-item {
    display: block;
  }
}
@media only screen and (min-width: 1024px) {
  .sidebar-container-inner:hover {
    width: 100%;
  }
}
.sidebar-container {
  width: 100%;
  height: auto;
}
@media only screen and (min-width: 768px) {
  .sidebar-container {
    width: 4.75rem;
    min-width: 4.75rem;
    max-width: 4.75rem;
    height: calc(100vh - 7.5rem);
    top: 5.5rem;
  }
}
@media only screen and (min-width: 1024px) {
  .sidebar-container {
    width: calc((100vw - 1280px) / 2);
    max-width: 20rem;
    min-width: 16rem;
    top: 6rem;
  }
}
.sidebar-spacer-right {
  width: calc((100vw - 1280px) / 2);
}
.sidebar-spacer-left {
  width: 100%;
  min-width: 3rem;
  z-index: 150;
}
@media only screen and (min-width: 768px) {
  .sidebar-spacer-left {
    width: calc((100vw - 1280px) / 2);
    min-width: 4.75rem;
    bottom: 0.5rem;
  }
}
@media only screen and (min-width: 1024px) {
  .sidebar-spacer-left {
    min-width: 16rem;
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
