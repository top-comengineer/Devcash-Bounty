<template>
  <div class="w-full flex flex-row justify-center relative my-24">
    <div class="sidebarSpacer-2 flex flex-row justify-end">
      <transition name="sidebarTransition">
        <div
          v-if="show"
          v-bind:class="[
            $store.state.theme.dt
              ? 'bg-dtBackgroundSecondary'
              : 'bg-ltBackgroundSecondary shadow-lg'
          ]"
          class="sidebar my-2 sticky top-24 rounded-tr-xl3 rounded-br-xl3 rounded-tl-xl rounded-bl-xl mr-4"
        ></div>
      </transition>
    </div>
    <div class="d-container-2">
      <div
        class="w-full flex flex-col justify-center items-center pr-4 xl:pr-0"
      >
        <BountyCard
          v-for="(n, i) in 30"
          :key="i"
          class="my-2"
          bountyName="Devcash Logo"
          creatorAddress="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          devAmount="1,250,000"
          ethAmount="2.778"
          usdAmount="750"
          remainingCount="1 of 1"
          remainingTime="3 months"
        />
      </div>
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
  width: calc((100vw - 1280px) / 2);
  max-width: 20rem;
  min-width: 15rem;
  height: calc(100vh - 8rem);
}
.sidebarSpacer {
  width: calc((100vw - 1280px) / 2);
}
.sidebarSpacer-2 {
  width: calc((100vw - 1280px) / 2);
  min-width: 15rem;
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
