<template>
  <div class="w-full flex flex-row flex-wrap justify-center">
    <h1 v-if="!isLoggedIn">Not logged in</h1>
    <h1 v-else-if="bountiesLoading">Bounties are loading</h1>
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
        <div class="flex flex-row flex-wrap">
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
      <!-- Header Row -->
      <div class="flex flex-row flex-wrap justify-between items-center">
        <!-- Header -->
        <h2
          class="text-2xl font-extrabold mx-4 my-2"
        >{{$t('bountyPlatform.bountyManager.yourBounties')}}</h2>
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
import { mapGetters } from "vuex";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";

const defaultBountyLimit = 10;

export default {
  layout: "bountyPlatform",
  components: {
    SubmissionCard,
    BountyCard,
    CheckmarkButton
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    })
  },
  methods: {
    async loadMoreBounties() {
      this.page++;
      this.bountiesLoading = true;
      try {
        let res = await this.$axios.get(
          `/bounty/listcreated?page=${this.page}&limit=${defaultBountyLimit}&creator=${this.loggedInAccount}`
        );
        for (let bounty of res.data.items) {
          this.totalBountyAmount = this.totalBountyAmount.add(
            utils.bigNumberify(bounty.bountyAmount)
          );
        }
        this.totalBountyAmountDisplay = utils.commify(
          utils.formatUnits(this.totalBountyAmount, 8)
        );
        this.bounties = this.bounties.concat(res.data.items);
        this.totalBountyCount = res.data.count;
        this.hasMoreBounties =
          Math.floor(res.data.count / defaultBountyLimit) > 1;
      } catch (e) {
        this.page--;
      } finally {
        this.initialBountiesLoading = false;
        this.bountiesLoading = false;
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.loadMoreBounties();
    }
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
  },
  data() {
    return {
      initialBountiesLoading: true,
      bountiesLoading: true,
      page: 0,
      totalBountyAmount: utils.bigNumberify("0"),
      totalBountyAmountDisplay: "0.0",
      totalBountyCount: 0,
      hasMoreBounties: false,
      bounties: [],
      // For meta tags
      pageTitle: this.$t("meta.bountyPlatform.bountyManager.pageTitle"),
      pageDescription: this.$t(
        "meta.bountyPlatform.bountyManager.pageDescription"
      ),
      pagePreview: `${process.env.BASE_URL}/previews/bountyplatform.png`,
      pageThemeColor: "#675CFF",
      canonicalURL: process.env.CANONICAL_URL
    };
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
