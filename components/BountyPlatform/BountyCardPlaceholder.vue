<template>
  <div
    :class="{
      'bg-c-background-sec border-c-background-sec': !type,
      'bg-c-background-qua border-c-background-qua': type == 'secondary',
    } "
    class="w-full flex flex-row flex-wrap justify-between items-center relative shadow-lg rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-4 pb-5 px-6 md:px-8"
  >
    <!-- Bounty Name and Address -->
    <div
      class="w-full md:w-3/7 flex flex-col flex-wrap justify-center items-start opacity-animation"
    >
      <h4
        class="bg-c-text text-transparent font-extrabold text-xl text-left rounded-full px-4 opacity-75"
      >Awesome Bounty</h4>
      <div class="flex flex-row items-center mt-1">
        <div class="bg-c-text jazziconPlaceholder rounded-full opacity-50 flex"></div>
        <h5
          class="bg-c-text text-transparent font-mono-jet font-medium text-md text-left ml-2 opacity-50 rounded-full px-4"
        >0xFFFF...FFFF</h5>
      </div>
    </div>
    <!-- Divider -->
    <div class="bg-c-text md:hidden w-full h-px rounded-full opacity-5 my-3"></div>
    <!-- Submissions Left and Remaining Time -->
    <div
      class="w-full md:w-2/7 flex flex-col justify-center order-last md:order-none items-start md:items-end opacity-animation"
    >
      <!-- Submissions Left -->
      <span
        class="text-transparent text-right text-sm bg-c-text font-bold rounded-full opacity-50"
      >1 of 1 bounties left</span>
      <!-- Remaining Time -->
      <span
        class="text-transparent text-right text-sm mt-2 bg-c-text font-bold rounded-full opacity-50"
      >11 months Remaining</span>
    </div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div
      class="w-full md:w-2/7 flex flex-col justify-center items-start md:items-end opacity-animation"
    >
      <h4
        class="bg-c-primary font-extrabold text-xl text-left md:text-right text-transparent rounded-full px-2"
      >{D}10,000,000</h4>
      <h5
        class="bg-c-text text-lg text-left md:text-right mt-1 text-transparent rounded-full px-2 opacity-50"
      >Ξ10.10 / $1,000</h5>
    </div>
    <!-- Divider -->
    <div class="bg-c-text md:hidden w-full h-px rounded-full opacity-5 my-3"></div>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
export default {
  components: {
    Icon,
    Jazzicon
  },
  props: {
    type: null
  },
};
</script>
<style >
.jazziconPlaceholder {
  width: 20px;
  height: 20px;
}
.opacity-animation {
  animation-name: opacity-keyframes;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

/* The animation code */
@keyframes opacity-keyframes {
  0% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.25;
  }
}
</style>