<template>
  <div class="w-full flex flex-col justify-center items-center">
    <!-- Header Card -->
    <div
      :class="[!$store.state.theme.dt?'shadow-lgS':'']"
      class="w-full flex flex-row flex-wrap justify-between items-center bg-dtPrimary text-dtText relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-2 pb-4 px-6 md:pt-4 md:pb-6 md:px-12 my-1 md:my-2"
    >
      <!-- Bounty Name, Creator Avatar & Address -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-start my-3">
        <h1 class="font-extrabold text-2xl md:text-3xl">Bounty Header</h1>
        <div class="flex flex-row items-center mt-1">
          <Jazzicon
            class="flex"
            :diameter="24"
            address="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          />
          <h3 class="font-mono-jet font-medium text-lg md:text-xl ml-2">0xFD611...4F2d</h3>
        </div>
      </div>
      <!-- Bounty Amount in Devcash, ETH & USD -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end my-3">
        <!-- Bounty Amount in Devcash -->
        <h2
          class="font-extrabold text-2xl md:text-3xl text-left md:text-right"
        >{{ '{D}' + '1,000' }}</h2>
        <!-- Bounty Amount in ETH & USD -->
        <h3
          class="text-lg md:text-xl text-left md:text-right mt-1"
        >{{ "Ξ" + '1' + " / " + "$" + '1' }}</h3>
      </div>
    </div>
    <!-- Bounty Description and Hunt & Contribue Cards -->
    <div class="w-full flex flex-row flex-wrap">
      <!-- Bounty Description -->
      <div
        :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full md:w-auto flex-1 flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-6 pb-8 md:pt-8 md:pb-12 px-6 md:px-12 my-1 md:my-2"
      >
        <h4 class="font-extrabold text-2xl">{{$t("bountyPlatform.singleBounty.bountyDescription")}}</h4>
        <p class="mt-2 leading-loose">
          The goal for this project is to develop a new frontend for the Devcash platform.
          <br />The frontend should utilize Ether.js to connect to the Ethereum blockchain using MetaMask and various other wallets. Creating, managing, and claiming bounties should be decentralized and occur on the Ethereum blockchain. Any off-chain functionality should be implemented using an already existing backend.
          <br />
          <br />Requirements:
          <br />- The frontend should consist of 2 main sections: 1- A home page where the features of Devcash and Devcash Bounty Platform is explains, 2- Devcash Bounty Platform, where users can create bounties using Devcash or hunt bounties and earn Devcash.
          - In the Devcash Bounty Platform section, users should be able to create, post or search bounties. Each bounty should have its dedicated page displaying information such as bounty name, total bounty in DEV, USD and ETH, time remaining, project description etc.
          <br />
          <br />Project timeline:
          This project should be done in less than 5 months.
        </p>
      </div>
      <!-- Divider -->
      <div class="w-4 hidden md:block"></div>
      <!-- Hunt & Contribute Card -->
      <div
        :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full md:w-auto md:max-w-xs flex flex-col flex-wrap relative overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg my-1 md:my-2"
      >
        <!-- Hunt and Contribute Button -->
        <div class="w-full flex flex-col items-center bg-dtSecondary px-6 py-4">
          <button
            class="w-full hover_scale-md focus_scale-md bg-dtText text-dtSecondary btn-textSecondary font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
          >{{ $t("bountyPlatform.singleBounty.buttonHunt") }}</button>
          <button
            class="w-full hover_scale-md focus_scale-md bg-dtSecondary text-dtText btn-textSecondary border-2 border-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
          >{{ $t("bountyPlatform.singleBounty.buttonContribute") }}</button>
        </div>
        <!-- Submissions Left and Remaining Time -->
        <div class="w-full flex flex-col px-6 py-6">
          <!-- Submissions Left -->
          <div class="flex flex-row items-center">
            <Icon
              class="w-4 h-4 mr-1"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="award"
            />
            <h6 class="text-sm">
              <span class="font-bold">{{ '1' + ' of ' + '1' }}</span>
              <span class="opacity-75">
                {{
                $t("bountyPlatform.bountyCard.bountiesLeft")
                }}
              </span>
            </h6>
          </div>
          <!-- Remaining Time -->
          <div class="flex flex-row items-center mt-1">
            <Icon
              class="w-4 h-4 mr-1"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="clock"
            />
            <h6 class="text-sm">
              <span class="font-bold">{{ "2 months"}}</span>
              <span class="opacity-75">
                {{
                $t("bountyPlatform.bountyCard.remaining")
                }}
              </span>
            </h6>
          </div>
        </div>
        <!-- Created By Text And Creator Card -->
        <div class="w-full flex flex-col px-6 pb-6">
          <h5 class="text-lg font-bold">{{$t("bountyPlatform.singleBounty.createdBy")}}</h5>
          <!-- Creator Card -->
          <CreatorCard
            name="Antoine De Vuyst"
            email="antoine@devcash.xyz"
            address="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
import CreatorCard from "~/components/BountyPlatform/CreatorCard.vue";

export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard,
    Jazzicon,
    Icon,
    CreatorCard
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.single);
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  }
};
</script>