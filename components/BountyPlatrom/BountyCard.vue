<template>
  <div class="w-full flex flex-row justify-between items-center py-4 px-8">
    <!-- Bounty Name and Address -->
    <div class="w-1/2 flex flex-col items-center"></div>
    <!-- Submissions Left and Remaining Time -->
    <div class="w-1/4 flex flex-col justify-end items-center"></div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div class="w-1/4 flex flex-col justify-end items-center"></div>
  </div>
</template>
<script>
export default {
  props: {
    name: null,
    creatorAddress: null,
    devAmount: null,
    ethAmount: null,
    usdAmount: null
  },
  data: function() {
    return {};
  }
};
</script>