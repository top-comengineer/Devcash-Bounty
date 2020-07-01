<template>
  <div class="flex">
    <div
      class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap items-center rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6"
    >
      <!-- Total Earned or Total Awarded -->
      <h6
        class="text-sm opacity-75"
      >{{type=="earned"?$t("bountyPlatform.overview.totalEarned"):type=='awarded'?$t("bountyPlatform.overview.totalAwarded"):$t("bountyPlatform.overview.approvedBalance")}}</h6>
      <h2
        class="text-c-primary text-3xl font-extrabold break-all mt-1"
      >{{$store.state.devcashData.balancePrimary.symbol}}{{$store.state.devcashData.ethIsPrimary?totalETH:totalDEV}}</h2>
      <h3
        class="font-semibold mt-1 break-all"
      >+ {{$store.state.devcashData.balanceSecondary.symbol}}{{$store.state.devcashData.ethIsPrimary?totalDEV:totalETH}}</h3>
      <!-- Bounties Hunted or Bounties Posted -->
      <div class="flex flex-col items-center mt-6" v-if="type == 'earned' || type == 'awarded'">
        <h6
          class="text-sm opacity-75"
        >{{type=="earned"?$t("bountyPlatform.overview.bountiesHunted"):$t("bountyPlatform.overview.bountiesPosted")}}</h6>
        <h2 class="text-3xl font-extrabold break-all mt-1">{{count}}</h2>
      </div>
      <!-- Approved Balance -->
      <div v-else class="flex flex-row flex-1 justify-center items-center mt-6">
        <Jazzicon class="flex" :diameter="36" :address="address" />
        <h2 class="font-mono-jet text-sm ml-2 font-bold" v-html="twoLineAddress(address)"></h2>
      </div>
    </div>
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
    type: null,
    totalDEV: null,
    totalETH: null,
    count: null,
    address: null
  },
  methods: {
    twoLineAddress: function(address) {
      return address.substring(0, 21) + "<br>" + address.substring(21, 42);
    },
    threeLineAddress: function(address) {
      return (
        address.substring(0, 14) +
        "<br>" +
        address.substring(14, 28) +
        "<br>" +
        address.substring(28, 42)
      );
    }
  }
};
</script>
