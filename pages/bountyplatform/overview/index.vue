<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full flex flex-row flex-wrap justify-center">
      <OverviewCard
        class="w-full md:w-1/2 lg:w-1/3"
        type="earned"
        totalDEV="2,562,138"
        totalETH="5.844"
        totalUSD="1,578"
        count="13"
      />
      <OverviewCard
        class="w-full md:w-1/2 lg:w-1/3"
        type="awarded"
        totalDEV="11,342,527"
        totalETH="25.214"
        totalUSD="6,808"
        count="36"
      />
      <OverviewCard
        class="w-full md:w-1/2 lg:w-1/3"
        type="earned"
        totalDEV="2,562,138"
        totalETH="5.844"
        totalUSD="1,578"
        count="13"
      />
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
