<template>
  <div class="w-full flex flex-row flex-wrap justify-center">
    <!-- Submissions Sent Card -->
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
        >{{$t('bountyPlatform.bountyHunter.submissionsSent')}}</h2>
        <!-- Checkboxes -->
        <div class="flex flex-row flex-wrap justify end">
          <CheckmarkButton
            checked="checked"
            class="my-3 mx-3"
            :text="$t('bountyPlatform.statusTag.pending')"
          />
          <CheckmarkButton
            checked="checked"
            class="my-3 mx-3"
            :text="$t('bountyPlatform.statusTag.approved')"
          />
          <CheckmarkButton
            checked="checked"
            class="my-3 mx-3"
            :text="$t('bountyPlatform.statusTag.rejected')"
          />
        </div>
      </div>
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
          class="text-lg hover_scale-lg focus_scale-lg font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
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
      <!-- Header Row -->
      <div class="flex flex-row flex-wrap justify-between items-center">
        <!-- Header -->
        <h2
          class="text-2xl font-extrabold mx-4 my-2"
        >{{$t('bountyPlatform.bountyHunter.personalBounties')}}</h2>
        <!-- Count, Amount & Checkboxes -->
        <div class="flex flex-row flex-wrap items-center">
          <div class="flex flex-row flex-wrap my-2 mr-10">
            <div class="flex flex-col items-center mx-4">
              <h6 class="opacity-75 text-sm">Count</h6>
              <h5 class="font-bold">{{ totalBountyCount }}</h5>
            </div>
            <div class="flex flex-col items-center mx-4">
              <h6 class="opacity-75 text-sm">Amount</h6>
              <h5 class="font-bold">{D}{{ totalBountyAmountDisplay }}</h5>
            </div>
          </div>
          <div class="flex flex-row flex-wrap my-3">
            <CheckmarkButton checked="checked" class="mx-3 my-2" text="Active" />
            <CheckmarkButton class="mx-3 my-2" text="Completed" />
            <CheckmarkButton class="mx-3 my-2" text="Expired" />
          </div>
        </div>
      </div>
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
      <div v-if="hasMoreBounties && !bountiesLoading" class="flex flex-row justify-center mt-2">
        <button
            @click="loadMoreBounties()"
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
import { utils } from "ethers";
import Axios from "axios";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";

const defaultBountyLimit = 10

export default {
  layout: "bountyPlatform",
  components: {
    SubmissionCard,
    BountyCard,
    CheckmarkButton
  },
  asyncData({ error, params, $axios }) {
    return $axios
      .get(`/bounty/listpersonal?page=1&limit=${defaultBountyLimit}&hunter=${params.hunter}`)
      .then(res => {
        let totalBountyAmount = utils.bigNumberify(0)
        for (let bounty of res.data.items) {
            totalBountyAmount = totalBountyAmount.add(utils.bigNumberify(bounty.bountyAmount))
        }
        let totalBountyAmountDisplay = utils.commify(utils.formatUnits(totalBountyAmount, 8))
        return {
          page: 1,
          perPage: defaultBountyLimit,
          bounties: res.data.items,
          totalBountyCount: res.data.count,
          totalBountyAmount: totalBountyAmount,
          totalBountyAmountDisplay: totalBountyAmountDisplay,
          hunter: params.hunter,
          bountiesLoading: false,
          hasMoreBounties: Math.floor(res.data.count / defaultBountyLimit) > 1
        };
      })
      .catch(e => {
        return error({
          statusCode: e.response != undefined ? r.response.status : 500,
          message: e.response != undefined && e.response.status == 422 ? `Address "${params.hunter}" is invalid` : "Unknown error occured"
        });
      });
  },
  methods: {
      async loadMoreBounties() {
        this.page++
        this.bountiesLoading = true;
        try {
            let res = await Axios.get(`/bounty/listpersonal?page=${this.page}&limit=${defaultBountyLimit}&hunter=${this.hunter}`)
            for (let bounty of res.data.items) {
                this.totalBountyAmount = this.totalBountyAmount.add(utils.bigNumberify(bounty.bountyAmount))
            }
            this.totalBountyAmountDisplay = utils.commify(utils.formatUnits(this.totalBountyAmount, 8))
            this.bounties.push(res.data.items)
            this.totalBountyCount = res.data.count
            this.totalBountyAmount
            this.hasMoreBounties = Math.floor(res.data.count / defaultBountyLimit) > 1
        } catch (e) {
            this.page--
        } finally {
            this.bountiesLoading = false
        }
    }
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit(
      "general/setSidebarContext",
      SIDEBAR_CONTEXTS.bountyHunter
    );
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  }
};
</script>
