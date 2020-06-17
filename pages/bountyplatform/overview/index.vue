<template>
  <div v-if="!isLoggedIn" class="w-full flex flex-row flex-wrap justify-center">
    <h1>
      NOT LOGGED IN
    </h1>
  </div>
  <div v-else class="w-full flex flex-row flex-wrap justify-center">
    <div class="w-full flex flex-row flex-wrap justify-center md:px-2">
      <OverviewCardPlaceholder
        v-if="overviewLoading"
        class="w-full md:w-1/2 xl:w-1/3 my-2 px-1 md:px-2"
        type="earned"
      />
      <OverviewCard
        v-else
        class="w-full md:w-1/2 xl:w-1/3 my-2 px-1 md:px-2"
        type="earned"
        :totalDEV="totalEarnedDC"
        :totalETH="totalEarnedEth"
        :count="totalSubmissions"
      />
      <OverviewCardPlaceholder
        v-if="overviewLoading"
        class="w-full md:w-1/2 xl:w-1/3 my-2 px-1 md:px-2"
        type="awarded"
      />
      <OverviewCard
        v-else
        class="w-full md:w-1/2 xl:w-1/3 my-2 px-1 md:px-2"
        type="awarded"
        :totalDEV="totalAwardedDC"
        :totalETH="totalAwardedEth"
        :count="totalBounties"
      />
      <OverviewCard
        class="w-full md:w-1/2 xl:w-1/3 my-2 px-1 md:px-2"
        type="balance"
        :totalDEV="balance.approved"
        :totalETH="balance.eth"
        :address="loggedInAccount"
      />
    </div>
    <!-- Activity Main Card -->
    <div
      :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 my-2 mx-1 md:mx-4"
    >
      <!-- Header -->
      <h2 class="text-2xl font-extrabold ml-4">{{$t('bountyPlatform.overview.activity')}}</h2>
      <!-- ActivityCards -->
      <div class="w-full flex flex-col flex-wrap my-4">
        <ActivityCard
          class="my-2"
          messageType="bountyCreated"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          messageType="submissionReceived"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
          address="0x65f2CDE79F96C82ef86Eb9cD6B9210075518a901"
        />
        <ActivityCard
          class="my-2"
          messageType="submissionSent"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          messageType="bountyPersonalCreated"
          perspective="manager"
          bountyName="Devcash Meme"
          date="03.12.2020 - 12:04"
          address="0x65f2CDE79F96C82ef86Eb9cD6B9210075518a901"
        />
        <ActivityCard
          class="my-2"
          messageType="bountyPersonalCreated"
          perspective="hunter"
          bountyName="ETH Library"
          date="03.12.2020 - 12:04"
          address="0x65f2CDE79F96C82ef86Eb9cD6B9210075518a901"
        />
        <ActivityCard
          class="my-2"
          perspective="manager"
          messageType="submissionApproved"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
          address="0x65f2CDE79F96C82ef86Eb9cD6B9210075518a901"
        />
        <ActivityCard
          class="my-2"
          perspective="hunter"
          messageType="submissionApproved"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          perspective="manager"
          messageType="submissionRejected"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
          address="0x65f2CDE79F96C82ef86Eb9cD6B9210075518a901"
        />
        <ActivityCard
          class="my-2"
          perspective="hunter"
          messageType="submissionRejected"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          perspective="manager"
          messageType="bountyAwarded"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
          address="0x65f2CDE79F96C82ef86Eb9cD6B9210075518a901"
        />
        <ActivityCard
          class="my-2"
          perspective="hunter"
          messageType="bountyAwarded"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          messageType="feeChanged"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          messageType="bountyCompleted"
          bountyName="Devcash Event Feedback"
          date="03.12.2020 - 12:04"
        />
        <ActivityCard
          class="my-2"
          messageType="bountyReclaimed"
          bountyName="Devcash Event Feedback"
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
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import { mapGetters } from "vuex";
import { utils } from "ethers";
import OverviewCard from "~/components/BountyPlatform/OverviewCard.vue";
import OverviewCardPlaceholder from "~/components/BountyPlatform/OverviewCardPlaceholder.vue";
import ActivityCard from "~/components/BountyPlatform/ActivityCard.vue";
export default {
  layout: "bountyPlatform",
  components: {
    OverviewCard,
    OverviewCardPlaceholder,
    ActivityCard
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance"
    })
  },
  methods: {
    async loadOverview() {
      try {
        let res = await this.$axios.get(
          `/stats/overview?address=${this.loggedInAccount}`
        );
        this.totalEarnedDC = utils.commify(utils.formatUnits(res.data.totalEarnedDC, 8));
        this.totalAwardedDC = utils.commify(utils.formatUnits(res.data.totalAwardedDC, 8));
        this.totalEarnedEth = utils.formatEther(res.data.totalEarnedWei)
        this.totalAwardedEth = utils.formatEther(res.data.totalAwardedWei)
        this.totalSubmissions = res.data.totalSubmissions
        this.totalBounties = res.data.totalBounties
      } catch (e) {
        console.log(`Error loading overview ${e}`)
      } finally {
        this.overviewLoading = false;
      }      
    }
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.overview);
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  },
  data() {
    return {
      // For meta tags
      pageTitle: this.$t("meta.bountyPlatform.overview.pageTitle"),
      pageDescription: this.$t("meta.bountyPlatform.overview.pageDescription"),
      pagePreview: `${process.env.BASE_URL}/previews/bountyplatform.png`,
      pageThemeColor: "#675CFF",
      canonicalURL: process.env.CANONICAL_URL,
      overviewLoading: true,
      totalSubmissions: -1,
      totalBounties: -1,
      totalEarnedDC: "-1",
      totalEarnedEth: "-1",
      totalAwardedDC: "-1",
      totalAwardedEth: "-1"
    };
  },
  mounted() {
    DevcashBounty.updateBalances(this)
    this.loadOverview()
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.pageDescription
        },
        // Google / Search Engine Tags
        {
          itemprop: "name",
          content: this.pageTitle
        },
        {
          itemprop: "description",
          content: this.pageDescription
        },
        {
          itemprop: "image",
          content: this.pagePreview
        },
        // Facebook Meta Tags
        {
          property: "og:url",
          content: this.canonicalURL
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: this.pageTitle
        },
        {
          property: "og:description",
          content: this.pageDescription
        },
        {
          property: "og:image",
          content: this.pagePreview
        },
        // Twitter Meta Tags
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: this.pageTitle
        },
        {
          name: "twitter:description",
          content: this.pageDescription
        },
        {
          name: "twitter:image",
          content: this.pagePreview
        },
        // Theme
        {
          name: "theme-color",
          content: this.pageThemeColor
        },
        // Windows 8 IE 10
        {
          name: "msapplication-TileColor",
          content: this.pageThemeColor
        },
        // Windows 8.1 + IE11 and above
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: this.pageThemeColor
        }
      ],
      link: [
        // Canonical
        {
          rel: "canonical",
          href: this.canonicalURL
        },
        // Generic Icons
        {
          rel: "icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    };
  }
};
</script>
