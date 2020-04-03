<template>
  <div class="px-2 mt-1 mb-3 md:my-2">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
      class="w-full flex flex-col flex-wrap justify-between items-center rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6"
    >
      <!-- Total Earned or Total Awarded -->
      <h6
        class="text-sm opacity-75"
      >{{type=="earned"?$t("bountyPlatform.overview.totalEarned"):$t("bountyPlatform.overview.totalAwarded")}}</h6>
      <h2 class="text-dtPrimary text-2xl font-extrabold">{D}{{totalDEV}}</h2>
      <h3 class="font-semibold mt-1">(Ξ{{totalETH}} / ${{totalUSD}})</h3>
      <!-- Bounties Hunted or Bounties Posted -->
      <h6
        class="text-sm opacity-75 mt-6"
      >{{type=="earned"?$t("bountyPlatform.overview.bountiesHunted"):$t("bountyPlatform.overview.bountiesPosted")}}</h6>
      <h2 class="text-2xl font-extrabold">{{count}}</h2>
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
    totalUSD: null,
    count: null
  }
};
</script>
