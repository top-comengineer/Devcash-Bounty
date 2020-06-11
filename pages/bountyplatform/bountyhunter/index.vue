<template>
  <div class="w-full flex flex-row flex-wrap justify-center px-1 md:px-4">
    <h1 v-if="!isLoggedIn">Not logged in</h1>
    <h1 v-else-if="bountiesLoading">Bounties are loading</h1>
    <!-- Submissions Sent Card -->
    <div
      :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 my-2"
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
          v-for="(item, i) in submissions"
          :key="i"
          :submission="item"
          :ubounty="item.ubounty"
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
      class="w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 my-2"
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
import { mapGetters } from "vuex";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
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
          `/bounty/listpersonal?page=${this.page}&limit=${defaultBountyLimit}&hunter=${this.loggedInAccount}`
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
        this.hasMoreBounties = this.totalBountyCount > this.bounties.length
      } catch (e) {
        this.page--;
      } finally {
        this.initialBountiesLoading = false;
        this.bountiesLoading = false;
      }
    },
    async loadMoreSubmissions() {
      this.submissionsPage++;
      this.submissionsLoading = true;
      try {
        let res = await this.$axios.get(
          `/submission/listhunter?page=${this.submissionsPage}&limit=${defaultBountyLimit}&hunter=${this.loggedInAccount}`
        );
        this.submissions = this.submissions.concat(res.data.items);
        this.totalSubmissionCount = res.data.count;
        this.hasMoreSubmissions = this.totalSubmissionCount > this.submissions.length
      } catch (e) {
        this.submissionsPage--;
      } finally {
        this.initialSubmissionsLoading = false;
        this.submissionsLoading = false;
      }
    }    
  },
  mounted() {
    if (this.isLoggedIn) {
      this.loadMoreBounties();
      this.loadMoreSubmissions();
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
  },
  data() {
    return {
      initialBountiesLoading: true,
      initialSubmissionsLoading: true,
      bountiesLoading: true,
      submissionsLoading: true,
      page: 0,
      submissionsPage: 0,
      totalBountyAmount: 0,
      totalBountyAmountDisplay: "0.0",
      totalBountyCount: 0,
      totalSubmissionCount: 0,
      hasMoreBounties: false,
      hasMoreSubmissions: false,
      bounties: [],
      submissions: [],
      // For meta tags
      pageTitle: this.$t("meta.bountyPlatform.bountyHunter.pageTitle"),
      pageDescription: this.$t(
        "meta.bountyPlatform.bountyHunter.pageDescription"
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
