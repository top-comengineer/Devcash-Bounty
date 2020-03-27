<template>
  <div class="w-full flex flex-row relative my-24">
    <transition name="sidebarTransition">
      <div
        v-if="show"
        class="sidebar bg-dtSecondary fixed my-2 sticky top-0 rounded-tr-xl3 rounded-br-xl3"
      ></div>
    </transition>
    <div class="w-full flex flex-col justify-center items-center px-4">
      <BountyCard
        v-for="(n, i) in 10"
        :key="i"
        class="my-2"
        bountyName="Devcash Logo"
        creatorAddress="0x60ca...5411"
        devAmount="1,250,000"
        ethAmount="2.778"
        usdAmount="750"
        remainingCount="1 of 1"
        remainingTime="3 months"
      />
    </div>
    <div class="sidebarSpacer"></div>
  </div>
</template>

<script>
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
export default {
  components: {
    BountyCard
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
.sidebar {
  max-width: calc((100vw - 1280px) / 2);
  min-width: 15rem;
  height: calc(100vh - 8rem);
}
.sidebarSpacer {
  width: calc((100vw - 1280px) / 2);
}
.sidebarTransition-enter-active {
  transition: all 0.25s ease-out;
  transform-origin: right top;
}
.sidebarTransition-leave-active {
  transition: all 0.25s ease-out;
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