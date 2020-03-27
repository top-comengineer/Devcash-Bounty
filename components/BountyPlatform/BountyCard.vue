<template>
  <div
    v-bind:class="[$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']"
    class="w-full flex flex-row justify-between items-center py-4 px-8 fill-current rounded-tl-xl3 rounded-br-xl3 rounded-tr-lg rounded-bl-lg transition-all ease-out duration-200"
  >
    <!-- Bounty Name and Address -->
    <div class="w-1/2 flex flex-col flex-wrap items-start justify-center">
      <h4 class="font-extrabold text-xl text-left my-1">{{bountyName}}</h4>
      <h5 class="font-mono-jet font-medium text-lg text-left my-1">{{creatorAddress}}</h5>
    </div>
    <!-- Submissions Left and Remaining Time -->
    <div class="w-1/4 flex flex-col items-end justify-center">
      <h6 class="text-right my-1">
        <span class="font-extrabold">{{remainingCount}}</span> bounties left
      </h6>
      <h6 class="text-right my-1">
        <span class="font-extrabold">{{remainingTime}}</span> remaining
      </h6>
    </div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div class="w-1/4 flex flex-col items-end justify-center">
      <h4 class="text-dtPrimary font-extrabold text-2xl text-right my-1">{{'{D}' + devAmount}}</h4>
      <h5 class="text-lg text-right my-1">{{'Ξ' + ethAmount + ' / ' + '$'+usdAmount}}</h5>
    </div>
  </div>
</template>
<script>
export default {
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