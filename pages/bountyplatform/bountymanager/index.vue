<template>
  <div class="w-full flex flex-row flex-wrap justify-center">
    <!-- Submissions Received Card -->
    <div
      :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mx-2 my-2"
    >
      <!-- Header Row -->
      <div class="flex flex-row flex-wrap justify-between items-center">
        <!-- Header -->
        <h2
          class="text-2xl font-extrabold mx-4 my-2"
        >{{$t('bountyPlatform.bountyManager.submissionsReceived')}}</h2>
        <!-- Checkboxes -->
        <div class="flex flex-row justify end">
          <CheckmarkButton
            checked="checked"
            class="my-3 mx-3"
            :text="$t('bountyPlatform.statusTag.pending')"
          />
          <CheckmarkButton class="my-3 mx-3" :text="$t('bountyPlatform.statusTag.approved')" />
          <CheckmarkButton class="my-3 mx-3" :text="$t('bountyPlatform.statusTag.rejected')" />
        </div>
      </div>
      <!-- Submissions -->
      <div class="w-full flex flex-col flex-wrap my-4">
        <SubmissionCard
          class="my-2"
          perspective="manager"
          bountyName="Devcash Event Feedback"
          status="pending"
          amountDEV="833"
          amountETH="0.00185"
          amountUSD="0.5"
          address="0x691B5b5ebcf2667Dad625b1483F428Aa98067ED6"
          message="The venue was cool: <b>8/10</b>.<br>The presentations were quite informative: <b>8.5/10</b>.<br>The food could be better: <b>6/10</b>."
          date="03.17.2020 - 13:33"
        />
        <SubmissionCard
          class="my-2"
          perspective="manager"
          bountyName="Devcash Memes"
          status="pending"
          amountDEV="12,500"
          amountETH="0.0277"
          amountUSD="7.5"
          address="0xD69BB46Ace0C47a0d14Cf73e70B0c02328cc5b3f"
          message="Here is my submission:<br><u>https://imgur.com/gallery/fPPN3bl</u>"
          date="03.16.2020 - 16:45"
        />
        <SubmissionCard
          class="my-2"
          perspective="manager"
          bountyName="Devcash Event Feedback"
          status="pending"
          amountDEV="833"
          amountETH="0.00185"
          amountUSD="0.5"
          address="0x0A00079D01e1d0eaFD2b2CA8D74ff030C2f7e726"
          message="Venue was quite nice and spacious: <b>8/10</b>.<br>Presentations were a little advanced for me: <b>8.5/10</b>.<br>Food was okay: <b>6/10</b>."
          date="03.14.2020 - 11:55"
        />
        <SubmissionCard
          class="my-2"
          perspective="manager"
          bountyName="Devcash Memes"
          status="pending"
          amountDEV="12,500"
          amountETH="0.0277"
          amountUSD="7.5"
          address="0x3a958Fb94D8B185D4D333A52CDd1e52D52224562"
          message="<u>https://imgur.com/gallery/ffOzC14</u>"
          date="03.12.2020 - 12:04"
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
          class="text-lg hover_scale-lg focus_scale-lg font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
        >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
      </div>
    </div>
    <!-- Your Bounties Card -->
    <div
      :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lgD']"
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mx-2 my-2"
    >
      <!-- Header -->
      <h2 class="text-2xl font-extrabold ml-4">{{$t('bountyPlatform.bountyManager.yourBounties')}}</h2>
      <!-- Your Bounties -->
      <div class="w-full flex flex-col flex-wrap my-4">
        <BountyCard
          type="secondary"
          v-for="(item, i) in bounties"
          :key="i"
          class="my-2"
          perspective="manager"
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
          class="text-lg hover_scale-lg focus_scale-lg font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
        >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";
export default {
  layout: "bountyPlatform",
  components: {
    SubmissionCard,
    BountyCard,
    CheckmarkButton
  },
  data() {
    return {
      bounties: [
        {
          name: "Devcash Frontend",
          hunter: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d",
          numSubmissions: "1",
          numLeft: "1",
          deadline: "1586170000"
        },
        {
          name: "Devcash Logo",
          hunter: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d",
          numSubmissions: "1",
          numLeft: "1",
          deadline: "1586180000"
        },
        {
          name: "Devcash Memes",
          hunter: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d",
          numSubmissions: "15",
          numLeft: "20",
          deadline: "1586190000"
        },
        {
          name: "Devcash Event Feedback",
          hunter: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d",
          numSubmissions: "65",
          numLeft: "100",
          deadline: "1586200000"
        }
      ]
    };
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit(
      "general/setSidebarContext",
      SIDEBAR_CONTEXTS.bountyManager
    );
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  }
};
</script>
