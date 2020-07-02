<template>
  <div class="w-full flex flex-row flex-wrap justify-center">
    <div v-if="isLoggedIn" class="w-full flex flex-row flex-wrap justify-center">
      <div class="w-full flex flex-row flex-wrap justify-center md:px-2">
        <OverviewCardPlaceholder
          v-if="overviewLoading"
          class="w-full md:w-1/2 xl:w-1/3 mb-4 px-1 md:px-2"
        />
        <OverviewCard
          v-else
          class="w-full md:w-1/2 xl:w-1/3 mb-4 px-1 md:px-2"
          type="earned"
          :totalDEV="totalEarnedDC"
          :totalETH="totalEarnedEth"
          :count="totalSubmissions"
        />
        <OverviewCardPlaceholder
          v-if="overviewLoading"
          class="w-full md:w-1/2 xl:w-1/3 mb-4 px-1 md:px-2"
        />
        <OverviewCard
          v-else
          class="w-full md:w-1/2 xl:w-1/3 mb-4 px-1 md:px-2"
          type="awarded"
          :totalDEV="totalAwardedDC"
          :totalETH="totalAwardedEth"
          :count="totalBounties"
        />
        <OverviewCardPlaceholder
          v-if="overviewLoading"
          class="w-full md:w-1/2 xl:w-1/3 mb-4 px-1 md:px-2"
        />
        <OverviewCard
          v-else
          class="w-full md:w-1/2 xl:w-1/3 mb-4 px-1 md:px-2"
          type="balance"
          :totalDEV="balance.primary.hasApproved ? balance.primary.approved : 'N/A'"
          :totalETH="$store.state.devcashData.ethIsPrimary ? balance.primary.amount : balance.secondary.amount"
          :address="loggedInAccount"
        />
      </div>
      <!-- Activity Main Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mb-4 mx-1 md:mx-4"
      >
        <!-- Header -->
        <h2 class="text-2xl font-extrabold ml-4">{{$t('bountyPlatform.overview.activity')}}</h2>
        <!-- ActivityCards -->
        <div v-if="activity.length>0" class="w-full flex flex-col flex-wrap my-4">
          <ActivityCard
            class="mb-4"
            v-for="(item, i) in activity"
            :key="i"
            :perspective="item.perspective"
            :messageType="item.type"
            :address="item.address"
            :bountyName="item.name"
            :date="formatDate(item.createdAt)"
          />
        </div>
        <!-- Load More Button 
      <div class="flex flex-row justify-center mt-2">
        <button
          class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
        >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>-->
        <!-- If is no activity -->
        <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
          <img
            class="max-w-xxxs h-auto relative"
            :src="require('~/assets/images/illustrations/foreground/activity.svg')"
            alt="No Activity Illustration"
          />
          <h6
            class="opacity-75 text-center mt-4 md:max-w-xs"
          >{{$t('bountyPlatform.overview.noActivity')}}</h6>
          <!-- Hunt & Post Bounties Call to Action -->
          <div class="flex flex-row flex-wrap justify-center mt-6 mb-4">
            <nuxt-link
              :to="localePath('bountyplatform')"
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-2 mx-3"
            >{{ $t("home.bountyPlatformSection.huntBountyButton") }}</nuxt-link>
            <nuxt-link
              :to="localePath('bountyplatform')"
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-2 mx-3"
            >{{ $t("home.bountyPlatformSection.postBountyButton") }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <sign-in-card-wrapper v-else class="mx-1 md:mx-4" />
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
import SignInCardWrapper from "~/components/BountyPlatform/SignInCardWrapper.vue";
export default {
  layout: "bountyPlatform",
  components: {
    OverviewCard,
    OverviewCardPlaceholder,
    ActivityCard,
    SignInCardWrapper
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance"
    }),
    currentLocale() {
      for (let locale of this.$i18n.locales) {
        if (locale.code == this.$i18n.locale) {
          return locale;
        }
      }
    }     
  },
  methods: {
    formatDate(dtStr) {
      return DevcashBounty.formatDateStr(this.currentLocale.iso, dtStr)
    },    
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
        this.activity = res.data.activity
      } catch (e) {
        console.log(`Error loading overview ${e}`)
      } finally {
        this.overviewLoading = false;
      }      
    }
  },
  activated() {
    // Set sidebar context
    this.$store.commit("setSidebarContext", SIDEBAR_CONTEXTS.overview);
  },
  deactivated() {
    this.$store.commit("setSidebarContext", null);
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
      totalAwardedEth: "-1",
      activity: []
    };
  },
  mounted() {
    if (this.isLoggedIn) {
      DevcashBounty.updateBalances(this)
      this.loadOverview()
    }
    this.$root.$on("signedIn", _ => {
      DevcashBounty.updateBalances(this)
      this.loadOverview()
    })    
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
