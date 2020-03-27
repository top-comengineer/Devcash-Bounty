<template>
  <div class="w-full flex flex-col justify-center items-center pr-4 xl:pr-0">
    <BountyCard
      v-for="(n, i) in 30"
      :key="i"
      class="my-2"
      bountyName="Devcash Logo"
      creatorAddress="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
      devAmount="1,250,000"
      ethAmount="2.778"
      usdAmount="750"
      remainingCount="1 of 1"
      remainingTime="3 months"
    />
  </div>
</template>

<script>
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
export default {
  layout: "bountyPlatform",
  components: {
    BountyCard
  }
};
</script>
