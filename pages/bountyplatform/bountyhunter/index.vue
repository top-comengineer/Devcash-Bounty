<template>
  <div class="w-full flex flex-row flex-wrap justify-center">
    <!-- Submissions Sent Card -->
    <div
      :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mx-2 my-2"
    >
      <!-- Header -->
      <h2 class="text-2xl font-extrabold ml-4">{{$t('bountyPlatform.bountyHunter.submissionsSent')}}</h2>
      <!-- Submissions -->
      <div class="w-full flex flex-col flex-wrap my-4">
        <SubmissionCard
          class="my-2"
          perspective="hunter"
          bountyName="ETH Hackathon Project"
          status="pending"
          amountDEV="575,000"
          amountETH="1.278"
          amountUSD="345"
          address="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          message="Resending the submission, added the instructions in README.md"
          date="03.16.2020, 14:40"
        />
        <SubmissionCard
          class="my-2"
          perspective="hunter"
          bountyName="ETH Hackathon Project"
          status="rejected"
          amountDEV="575,000"
          amountETH="1.278"
          amountUSD="345"
          address="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          message="My hackathon project is attached to this submission."
          date="03.15.2020, 16:45"
        />
        <SubmissionCard
          class="my-2"
          perspective="hunter"
          bountyName="Ethereum NPM Package"
          status="approved"
          amountDEV="1,500,000"
          amountETH="3.333"
          amountUSD="900"
          address="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          message="Link to the finished package we’ve created:<br><u>https://github.com/antoine/ethnpmpackage</u>"
          date="02.28.2020, 15:03"
        />
        <SubmissionCard
          class="my-2"
          perspective="hunter"
          bountyName="ETH Library Written in Dart"
          status="approved"
          amountDEV="3,500,000"
          amountETH="7.78"
          amountUSD="2100"
          address="0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
          message="Here is the repo for the completed library:<br><u>https://github.com/antoine/ethlibrary</u>"
          date="02.15.2020, 14:35"
        />
      </div>
      <!-- Load More Button -->
      <div class="flex flex-row justify-center mt-2">
        <button
          :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText'
        ]"
          class="text-lg hover_scale-lg focus_scale-lg md:ml-4 lg:ml-6 font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
        >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
      </div>
    </div>
    <!-- Personal Bounties Card -->
    <div
      :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lgD']"
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mx-2 my-2"
    >
      <!-- Header -->
      <h2
        class="text-2xl font-extrabold ml-4"
      >{{$t('bountyPlatform.bountyHunter.personalBounties')}}</h2>
      <!-- Personal Bounties -->
      <div class="w-full flex flex-col flex-wrap my-4">
        <BountyCard
          type="secondary"
          v-for="(item, i) in bounties"
          :key="i"
          class="my-2"
          :bounty="item"
        />
      </div>
      <!-- Load More Button -->
      <div class="flex flex-row justify-center mt-2">
        <button
          :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText'
        ]"
          class="text-lg hover_scale-lg focus_scale-lg md:ml-4 lg:ml-6 font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
        >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
export default {
  layout: "bountyPlatform",
  components: {
    SubmissionCard,
    BountyCard
  },
  data() {
    return {
      bounties: [
        {
          name: "ETH Hackathon Project",
          hunter: "0xec37D7AF90De2B6AeB1331Ef45DA8924189458A6",
          numSubmissions: "1",
          numLeft: "1",
          deadline: "1586170000"
        },
        {
          name: "Ethereum NPM Package",
          hunter: "0xec37D7AF90De2B6AeB1331Ef45DA8924189458A6",
          numSubmissions: "1",
          numLeft: "1",
          deadline: "1586180000"
        }
      ]
    };
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
