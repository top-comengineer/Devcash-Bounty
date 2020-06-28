<template>
  <div class="w-full flex flex-col justify-center items-center px-1 md:px-4">
    <GreetingCard class="mb-2" type="explore" />
    <CategoriesBar class="my-2" />
    <div v-if="loading" class="w-full flex flex-col justify-center items-center">
      <BountyCardPlaceholder class="my-2" v-for="(n, i ) in 10" :key="i" />
    </div>
    <!-- No matching results for search -->
    <div
      v-else-if="filteredBounties.length <= 0 && bounties.length > 0"
      class="bg-c-background-sec shadow-lg w-full flex flex-col justify-center items-center flex-wrap py-12 mt-2 mb-4 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg"
    >
      <img
        class="max-w-xxxs h-auto relative"
        :src="require('~/assets/images/illustrations/background/search.svg')"
        alt="No Resulst Matching"
      />
      <p
        class="text-xl font-bold text-center mt-4 md:max-w-xs"
      >{{$t('bountyPlatform.explore.search.noMatchingResults')}}</p>
    </div>
    <div v-else class="w-full flex flex-col justify-center items-center">
      <BountyCard v-for="(item, i) in filteredBounties" :key="i" class="my-2" :bounty="item" />
    </div>
    <div v-if="hasMore && !loading" class="flex flex-row justify-center mt-2">
      <button
        @click="getBounties()"
        class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
      >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
    </div>
    <div v-else-if="loadingMore">
      <button
        class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
      >{{ $t("bountyPlatform.buttonLoading") }}</button>
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
import CategoriesBar from "~/components/BountyPlatform/CategoriesBar.vue";
import {
  DevcashBounty,
  AccountNotFoundError
} from "~/plugins/devcash/devcashBounty.client";
export default {
  layout: "bountyPlatform",
  components: {
    BountyCard,
    BountyCardPlaceholder,
    GreetingCard,
    CategoriesBar
  },
  data() {
    return {
      loading: true,
      loadingMore: false,
      hasMore: false,
      page: 0,
      perPage: 50,
      bounties: [],
      filteredBounties: [],
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
      loggedInAccount: "devcashData/loggedInAccount",
      sortType: "devcashData/exploreSortType",
      sortDirection: "devcashData/exploreOrderDirection",
      status: "devcashData/exploreStatus",
      categories: "devcashData/exploreCategories"
    })
  },
  methods: {
    getBountyStatus(bounty) {
      if (bounty.submissions.filter(sub => sub.status == 'approved').length >= bounty.available) {
        return "completed"
      } else if (new Date().getTime() / 1000 >= bounty.deadline) {
        return "expired"
      }
      return "active"
    },    
    applyFilters() {
      this.filteredBounties = this.bounties.filter((bounty) => (this.getBountyStatus(bounty) == 'completed' && this.status.completed) || (this.getBountyStatus(bounty) == 'expired' && this.status.expired) || (this.getBountyStatus(bounty) == 'active' && this.status.active))
      if (this.$store.state.devcashData.exploreSearchText && this.$store.state.devcashData.exploreSearchText != '') {
        this.filteredBounties = this.filteredBounties.filter((bounty) => bounty.title.toLowerCase().includes(this.$store.state.devcashData.exploreSearchText))
      }
      let categoriesToExclude = []
      if (!this.categories.create) {
        categoriesToExclude.push('create')
      }
      if (!this.categories.enhance) {
        categoriesToExclude.push('enhance')
      }     
      if (!this.categories.bug) {
        categoriesToExclude.push('bug')
      }
      if (!this.categories.support) {
        categoriesToExclude.push('support')
      }
      if (!this.categories.prototype) {
        categoriesToExclude.push('prototype')
      }
      if (!this.categories.other) {
        categoriesToExclude.push('other')
      }
      if (categoriesToExclude.length > 0) {
        this.filteredBounties = this.filteredBounties.filter((bounty) => !categoriesToExclude.includes(bounty.category))
      }       
    },
    async getBounties() {
      this.page++
      if (this.page == 1) {
        this.loading = true
      } else {
        this.loadingMore = true
      }
      try {
        await DevcashBounty.initEthConnector(this);
        let hunterParam = this.isLoggedIn
          ? `&hunter=${this.loggedInAccount}`
          : "";
        let sortType = this.sortType
        if (sortType == 'value' && this.$store.state.devcashData.ethIsPrimary) {
          sortType = 'valueEth'
        } else if (sortType == 'value') {
          sortType = 'valueDC'
        }
        let direction = this.sortDirection
        if (direction != 'desc' && direction != 'asc') {
          direction = 'desc'
        }
        let res = await Axios.get(
          `/bounty/list?page=${this.page}&limit=${this.perPage}${hunterParam}&sort=${sortType}&order=${direction}`
        );

        this.bounties = this.bounties.concat(res.data.items)
        this.hasMore = res.data.count > this.bounties.length
        this.applyFilters()
      } catch (e) {
        this.page--
      } finally {
        this.loading = false
        this.loadingMore = false
      }
    }
  },
  mounted() {
    this.getBounties();
    this.$root.$on('signedIn', () => {
      this.page = 0
      this.bounties = []
      this.loading = true
      this.hasMore = false
      this.loadingMore = false
      this.getBounties()
    })
    this.$root.$on('sortChanged', () => {
      this.page = 0
      this.bounties = []
      this.loading = true
      this.hasMore = false
      this.loadingMore = false
      this.getBounties()
    })
    this.$root.$on('filtersChanged', () => {
      this.applyFilters()
    })
    this.$root.$on('bountyCreated', (bounty) => {
      this.bounties.unshift(bounty)
      this.applyFilters()
    })
  },
  activated() {
    // Set sidebar context
    this.$store.commit("setSidebarContext", SIDEBAR_CONTEXTS.explore);
  },
  deactivated() {
    this.$store.commit("setSidebarContext", null);
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
