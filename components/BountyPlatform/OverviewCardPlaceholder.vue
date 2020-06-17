<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
      class="w-full flex flex-col flex-wrap items-center rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6"
    >
      <!-- Total Earned or Total Awarded -->
      <h6
        class="text-sm opacity-75"
      >{{type=="earned"?$t("bountyPlatform.overview.totalEarned"):type=='awarded'?$t("bountyPlatform.overview.totalAwarded"):$t("bountyPlatform.overview.approvedBalance")}}</h6>
      <h2 class="text-transparent text-3xl font-extrabold break-all opacity-animation bg-dtPrimary rounded-full">{D}0,000</h2>
      <h3 class="text-transparent font-semibold mt-1 break-all opacity-animation rounded-full" :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'">(Ξ000)</h3>
      <!-- Bounties Hunted or Bounties Posted -->
      <div class="flex flex-col items-center mt-6" v-if="type == 'earned' || type == 'awarded'">
        <h6
          class="text-sm opacity-75"
        >{{type=="earned"?$t("bountyPlatform.overview.bountiesHunted"):$t("bountyPlatform.overview.bountiesPosted")}}</h6>
        <h2 class="text-3xl text-transparent font-extrabold break-all opacity-animation rounded-full" :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'">0,000</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
  },
};
</script>
<style scoped>
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