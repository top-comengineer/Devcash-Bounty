<template>
  <div
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
    class="w-full flex flex-row flex-wrap justify-between items-center py-4 px-6 md:px-8 fill-current rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg"
  >
    <!-- Bounty Name and Address -->
    <div
      class="w-full md:w-3/7 flex flex-col flex-wrap justify-center items-start opacity-animation"
    >
      <h4
        v-bind:class="[$store.state.theme.dt? 'bg-dtText': 'bg-ltText']"
        class="text-transparent font-extrabold text-xl text-left rounded-full px-4 opacity-75"
      >Awesome Bounty</h4>
      <div class="flex flex-row items-center mt-1">
        <div
          v-bind:class="[$store.state.theme.dt? 'bg-dtText': 'bg-ltText']"
          class="jazziconPlaceholder rounded-full opacity-50"
        ></div>
        <h5
          v-bind:class="[$store.state.theme.dt? 'bg-dtText': 'bg-ltText']"
          class="text-transparent font-mono-jet font-medium text-md text-left mb-1 ml-2 opacity-50 rounded-full px-4"
        >0xFFFF...FFFF</h5>
      </div>
    </div>
    <!-- Divider -->
    <div
      v-bind:class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
      class="md:hidden w-full h-px rounded-full opacity-5 my-3"
    ></div>
    <!-- Submissions Left and Remaining Time -->
    <div
      class="w-full md:w-2/7 flex flex-col justify-center order-last md:order-none items-start md:items-end opacity-animation"
    >
      <!-- Submissions Left -->
      <div class="flex flex-row justify-end items-center">
        <div class="w-4 h-4 mr-1 bg-transparent"></div>
        <h6
          v-bind:class="[$store.state.theme.dt? 'bg-dtText': 'bg-ltText']"
          class="text-right text-sm text-transparent rounded-full opacity-50"
        >
          <span class="font-bold">1 of 1</span>
          <span>
            {{
            $t("bountyPlatform.bountyCard.bountiesLeft")
            }}
          </span>
        </h6>
      </div>
      <!-- Remaining Time -->
      <div class="flex flex-row justify-end items-center mt-1">
        <div class="w-4 h-4 mr-1 bg-transparent"></div>
        <h6
          v-bind:class="[$store.state.theme.dt? 'bg-dtText': 'bg-ltText']"
          class="text-right text-sm text-transparent rounded-full opacity-50"
        >
          <span class="font-bold">11 months</span>
          <span>
            {{
            $t("bountyPlatform.bountyCard.remaining")
            }}
          </span>
        </h6>
      </div>
    </div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div
      class="w-full md:w-2/7 flex flex-col justify-center items-start md:items-end opacity-animation"
    >
      <h4
        class="bg-dtPrimary font-extrabold text-xl text-right text-transparent rounded-full px-2"
      >{D}10,000,000</h4>
      <h5
        v-bind:class="[$store.state.theme.dt? 'bg-dtText': 'bg-ltText']"
        class="text-lg text-right mt-1 text-transparent rounded-full px-2 opacity-50"
      >Ξ10.10 / $1,000</h5>
    </div>
    <!-- Divider -->
    <div
      v-bind:class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
      class="md:hidden w-full h-px rounded-full bg-dtText opacity-5 my-3"
    ></div>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
export default {
  components: {
    Icon,
    Jazzicon
  }
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