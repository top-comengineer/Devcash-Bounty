<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full flex flex-row flex-wrap justify-center">
      <OverviewCard
        class="w-full md:w-1/2 xl:w-1/3 px-2 my-2"
        type="earned"
        totalDEV="2,562,138"
        totalETH="5.844"
        totalUSD="1,578"
        count="13"
      />
      <OverviewCard
        class="w-full md:w-1/2 xl:w-1/3 px-2 my-2"
        type="awarded"
        totalDEV="11,342,527"
        totalETH="25.214"
        totalUSD="6,808"
        count="36"
      />
      <OverviewCard
        class="w-full md:w-1/2 xl:w-1/3 px-2 my-2"
        type="balance"
        totalDEV="2,650,000"
        totalETH="5.891"
        totalUSD="1,590"
        address="0xd63bf92ACdAf488fa6eF02174fb86208Ad774555"
      />
      <!-- Activity Card -->
      <div
        :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
        class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-6 md:px-12 mx-2 my-2"
      >
        <h2 class="text-2xl font-extrabold">Activity</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import OverviewCard from "~/components/BountyPlatform/OverviewCard.vue";
export default {
  layout: "bountyPlatform",
  components: {
    OverviewCard
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.post);
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  }
};
</script>
