<template>
  <div
    v-bind:class="[$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']"
    class="w-full flex flex-row justify-between items-center py-4 px-8 fill-current rounded-tl-xl3 rounded-br-xl3 rounded-tr-lg rounded-bl-lg transition-all ease-out duration-200"
  >
    <!-- Bounty Name and Address -->
    <div class="w-1/2 flex flex-col flex-wrap justify-center items-start">
      <h4 class="font-extrabold text-xl text-left">{{bountyName}}</h4>
      <h5 class="font-mono-jet font-medium text-lg text-left mt-1">{{creatorAddress}}</h5>
    </div>
    <!-- Submissions Left and Remaining Time -->
    <div class="w-1/4 flex flex-col justify-center items-end">
      <!-- Submissions Left -->
      <div class="flex flex-row justify-end items-center">
        <Icon
          class="w-4 h-4 mr-1"
          :colorClass="
                $store.state.theme.dt
                  ? 'text-dtText'
                  : 'text-ltText'
              "
          type="award"
        />
        <h6 class="text-right text-sm">
          <span class="font-extrabold">{{remainingCount}}</span>
          <span class="opacity-75">bounties left</span>
        </h6>
      </div>
      <!-- Remaining Time -->
      <div class="flex flex-row justify-end items-center mt-1">
        <Icon
          class="w-4 h-4 mr-1"
          :colorClass="
                $store.state.theme.dt
                  ? 'text-dtText'
                  : 'text-ltText'
              "
          type="clock"
        />
        <h6 class="text-right text-sm">
          <span class="font-extrabold">{{remainingTime}}</span>
          <span class="opacity-75">remaining</span>
        </h6>
      </div>
    </div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div class="w-1/4 flex flex-col justify-center items-end">
      <h4 class="text-dtPrimary font-extrabold text-2xl text-right">{{'{D}' + devAmount}}</h4>
      <h5 class="text-lg text-right mt-1">{{'Ξ' + ethAmount + ' / ' + '$'+usdAmount}}</h5>
    </div>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Icon
  },
  props: {
    bountyName: null,
    creatorAddress: null,
    devAmount: null,
    ethAmount: null,
    usdAmount: null,
    remainingCount: null,
    remainingTime: null
  },
  data: function() {
    return {};
  }
};
</script>