<template>
  <div class="w-full flex flex-col justify-center items-center px-1 md:px-4">
    <GreetingCard class="my-2" />
    <div v-if="loading" class="w-full flex flex-col justify-center items-center">
      <BountyCardPlaceholder class="my-2" v-for="(n, i ) in 10" :key="i" />
    </div>
    <div v-else class="w-full flex flex-col justify-center items-center">
      <BountyCard v-for="(item, i) in bounties" :key="i" class="my-2" :bounty="item" />
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { mapGetters } from "vuex";
import Axios from "axios";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import BountyCardPlaceholder from "~/components/BountyPlatform/BountyCardPlaceholder.vue";
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import {
  DevcashBounty,
  AccountNotFoundError
} from "~/plugins/devcash/devcashBounty.client";
export default {
  layout: "bountyPlatform",
  components: {
    BountyCard,
    BountyCardPlaceholder,
    GreetingCard
  },
  data() {
    return {
      loading: true,
      bountiesCurPage: [],
      page: 1,
      perPage: 10,
      hasPageMap: {},
      totalPages: 1,
      // For meta tags
      pageTitle: this.$t("meta.bountyPlatform.pageTitle"),
      pageDescription: this.$t("meta.bountyPlatform.pageDescription"),
      pagePreview: `${process.env.BASE_URL}/previews/bountyplatform.png`,
      pageThemeColor: "#675CFF",
      canonicalURL: process.env.CANONICAL_URL
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    })
  },
  methods: {
    async initEthConnector() {
      if (this.$store.state.devcash.connector == null) {
        try {
          let connector = await DevcashBounty.init(
            this.$store.state.devcashData.loggedInAccount,
            this.$store.state.devcashData.provider
          );
          this.$store.commit("devcash/setConnector", connector);
        } catch (e) {
          // TODO - handle these correctly
          if (e instanceof AccountNotFoundError) {
            // TODO - re-use this sign out logic, maybe add an alert to tell them they're signed out?
            this.$store.commit("devcashData/setProvider", null);
            this.$store.commit("devcashData/setLoggedInAccount", null);
            this.$store.commit("devcash/setConnector", null);
            this.initEthConnector();
          } else {
            alert(`Unknown error ${e}`);
            throw e;
          }
        }
      }
    },
    async getBounties() {
      await this.initEthConnector();
      let key = `${this.page}:${this.perPage}:${
        this.isLoggedIn ? this.loggedInAccount : ""
      }`;
      if (key in this.hasPageMap) {
        return this.hasPageMap[key];
      }
      let hunterParam = this.isLoggedIn
        ? `&hunter=${this.loggedInAccount}`
        : "";
      let res = await Axios.get(
        `/bounty/list?page=${this.page}&limit=${this.perPage}${hunterParam}`
      );
      if (res.status != 200) {
        // TODO error handling
        return;
      }
      this.hasPageMap[key] = res.data.items;
      this.bounties = res.data.items;
      this.totalPages = Math.floor(res.data.count / res.data.perPage);
      if (this.totalPages <= 0) {
        this.totalPages = 1;
      }
      this.loading = false;
    }
  },
  mounted() {
    this.getBounties();
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.explore);
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
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
