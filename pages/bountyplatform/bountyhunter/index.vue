<template>
  <div class="w-full flex flex-row flex-wrap justify-center px-1 md:px-4">
    <div v-if="isLoggedIn" class="w-full flex flex-row flex-wrap justify-center">
      <!-- Submissions Sent Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mb-2"
      >
        <!-- Header Row -->
        <div class="flex flex-row flex-wrap justify-between items-center">
          <!-- Header -->
          <h2
            class="text-2xl font-extrabold mx-4 my-2"
          >{{$t('bountyPlatform.bountyHunter.submissionsSent')}}</h2>
          <!-- Checkboxes -->
          <div
            v-if="submissions.length>0 && !submissionsLoading"
            class="flex flex-row flex-wrap justify end"
          >
            <CheckmarkButton
              :checked="subPendingChecked"
              :callback="(checked) => submissionFilterChanged(checked, 'pending')"
              class="my-3 mx-3"
              :text="$t('bountyPlatform.statusTag.pending')"
            />
            <CheckmarkButton
              :checked="subApprovedChecked"
              :callback="(checked) => submissionFilterChanged(checked, 'approved')"
              class="my-3 mx-3"
              :text="$t('bountyPlatform.statusTag.approved')"
            />
            <CheckmarkButton
              :checked="subRejectedChecked"
              :callback="(checked) => submissionFilterChanged(checked, 'rejected')"
              class="my-3 mx-3"
              :text="$t('bountyPlatform.statusTag.rejected')"
            />
          </div>
        </div>
        <!-- Loading -->
        <div v-if="submissionsLoading">
          <SubmissionCardPlaceholder v-for="num in 2" :key="num" class="my-2" />
        </div>
        <!-- If there are submissions -->
        <div v-else-if="submissions.length>0" class="w-full flex flex-col flex-wrap my-4">
          <SubmissionCard
            class="my-2"
            perspective="hunter"
            v-for="(item, i) in filteredSubmissions"
            :key="i"
            :submission="item"
            :ubounty="item.ubounty"
          />
        </div>
        <!-- If there are no submissions -->
        <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
          <img
            class="max-w-xxxs h-auto relative"
            :src="require('~/assets/images/illustrations/foreground/submission-sent.svg')"
            alt="No Submissions Illustration"
          />
          <h6
            class="opacity-75 text-center mt-4 md:max-w-xs"
          >{{$t('bountyPlatform.bountyHunter.noSubmissionsSent')}}</h6>
          <!-- Hunt Bounties Call to Action -->
          <div class="flex flex-row justify-center">
            <nuxt-link
              :to="localePath('bountyplatform')"
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-6"
            >{{ $t("home.bountyPlatformSection.huntBountyButton") }}</nuxt-link>
          </div>
        </div>
        <!-- Load More Button -->
        <div
          v-if="hasMoreSubmissions && !submissionsLoading"
          class="flex flex-row justify-center mt-2"
        >
          <button
            class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
      </div>
      <!-- Personal Bounties Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 my-2"
      >
        <!-- Header Row -->
        <div class="flex flex-row flex-wrap justify-between items-center">
          <!-- Header -->
          <h2
            class="text-2xl font-extrabold mx-4 my-2"
          >{{$t('bountyPlatform.bountyHunter.personalBounties')}}</h2>
          <!-- Count, Amount & Checkboxes -->
          <div
            v-if="bounties.length>0 && !bountiesLoading"
            class="flex flex-row flex-wrap items-center"
          >
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
              <CheckmarkButton 
              :checked="bountyActiveChecked"
              :callback="(checked) => bountyFilterChanged(checked, 'active')"
              class="mx-3 my-2"
              :text="$t('bountyPlatform.explore.sidebar.statusActive')" />
              <CheckmarkButton 
              :checked="bountyCompletedChecked"
              :callback="(checked) => bountyFilterChanged(checked, 'completed')"
              class="mx-3 my-2" 
              :text="$t('bountyPlatform.explore.sidebar.statusCompleted')" />
              <CheckmarkButton 
              :checked="bountyExpiredChecked"
              :callback="(checked) => bountyFilterChanged(checked, 'expired')"
              class="mx-3 my-2" 
              :text="$t('bountyPlatform.explore.sidebar.statusExpired')" />
            </div>
          </div>
        </div>
        <div v-if="bountiesLoading">
          <BountyCardPlaceholder type="secondary" v-for="num in 4" :key="num" class="my-2" />
        </div>
        <!-- If there are personal bounties -->
        <div v-else-if="bounties.length>0" class="w-full flex flex-col flex-wrap my-4">
          <BountyCard
            type="secondary"
            v-for="(item, i) in filteredBounties"
            :key="i"
            class="my-2"
            :bounty="item"
          />
        </div>
        <!-- If there are no personal bounties -->
        <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
          <img
            class="max-w-xxxs h-auto relative"
            :src="require('~/assets/images/illustrations/foreground/bounty-personal.svg')"
            alt="No Personal Bounty Illustration"
          />
          <h6
            class="opacity-75 text-center mt-4 md:max-w-xs"
          >{{$t('bountyPlatform.bountyHunter.noPersonalBounties')}}</h6>
          <!-- Hunt Bounties Call to Action -->
          <div class="flex flex-row justify-center">
            <nuxt-link
              :to="localePath('bountyplatform')"
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-6"
            >{{ $t("home.bountyPlatformSection.huntBountyButton") }}</nuxt-link>
          </div>
        </div>
        <div v-if="hasMoreBounties && !bountiesLoading" class="flex flex-row justify-center mt-2">
          <button
            @click="loadMoreBounties()"
            class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
      </div>
    </div>
    <sign-in-to-continue-wrapper v-else />
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { utils, BigNumber } from "ethers";
import { mapGetters } from "vuex";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import SubmissionCardPlaceholder from "~/components/BountyPlatform/SubmissionCardPlaceholder.vue";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import BountyCardPlaceholder from "~/components/BountyPlatform/BountyCardPlaceholder.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";
import SignInToContinueWrapper from "~/components/BountyPlatform/SignInToContinueWrapper.vue";
const defaultBountyLimit = 50;

export default {
  layout: "bountyPlatform",
  components: {
    SubmissionCard,
    SubmissionCardPlaceholder,    
    BountyCard,
    BountyCardPlaceholder,
    CheckmarkButton,
    SignInToContinueWrapper
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
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
    applyBountyFilters() {
      this.filteredBounties = this.bounties.filter((bounty) => (this.getBountyStatus(bounty) == 'active' && this.bountyActiveChecked) || (this.getBountyStatus(bounty) == 'expired' && this.bountyExpiredChecked) || (this.getBountyStatus(bounty) == 'completed' && this.bountyCompletedChecked))
    },
    bountyFilterChanged(checked, type) {
      switch (type) {
        case 'active':
          this.bountyActiveChecked = checked
          break;
        case 'expired':
          this.bountyExpiredChecked = checked
          break;
        case 'completed':
          this.bountyCompletedChecked = checked
          break;
        default:
          break;
      }
      this.applyBountyFilters()
    },    
    applySubmissionFilters() {
      this.filteredSubmissions = this.submissions.filter((sub) => (sub.status == 'approved' && this.subApprovedChecked) || (sub.status == 'pending' && this.subPendingChecked) || (sub.status == 'rejected' && this.subRejectedChecked))
    },
    submissionFilterChanged(checked, type) {
      switch (type) {
        case 'pending':
          this.subPendingChecked = checked
          break;
        case 'approved':
          this.subApprovedChecked = checked
          break;
        case 'rejected':
          this.subRejectedChecked = checked
          break;
        default:
          break;
      }
      this.applySubmissionFilters()
    },
    async loadMoreBounties() {
      this.page++;
      this.bountiesLoading = true;
      try {
        let res = await this.$axios.get(
          `/bounty/listpersonal?page=${this.page}&limit=${defaultBountyLimit}&hunter=${this.loggedInAccount}`
        );
        for (let bounty of res.data.items) {
          this.totalBountyAmount = this.totalBountyAmount.add(
            BigNumber.from(bounty.bountyAmount)
          );
        }
        this.totalBountyAmountDisplay = utils.commify(
          utils.formatUnits(this.totalBountyAmount, 8)
        );
        this.bounties = this.bounties.concat(res.data.items);
        this.applyBountyFilters()
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
        this.applySubmissionFilters()
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
    // Auto update statuses
    this.$root.$on("subApproved", (objR) => {
      for (const submission of this.submissions) {
        if (submission.ubounty_id == objR.bounty && submission.submission_id == objR.submission) {
          submission.status = 'approved'
        }
      }
    })
    this.$root.$on("subRejected", (objR) => {
      for (const submission of this.submissions) {
        if (submission.ubounty_id == objR.bounty && submission.submission_id == objR.submission) {
          submission.status = 'rejected'
        }
      }
    })    
  },
  activated() {
    // Set sidebar context
    this.$store.commit(
      "setSidebarContext",
      SIDEBAR_CONTEXTS.bountyHunter
    );
  },
  deactivated() {
    this.$store.commit("setSidebarContext", null);
  },
  data() {
    return {
      subRejectedChecked: true,
      subPendingChecked: true,
      subApprovedChecked: true,
      bountyActiveChecked: true,
      bountyCompletedChecked: true,
      bountyExpiredChecked: true,
      initialBountiesLoading: true,
      initialSubmissionsLoading: true,
      bountiesLoading: true,
      submissionsLoading: true,
      page: 0,
      submissionsPage: 0,
      totalBountyAmount: BigNumber.from(0),
      totalBountyAmountDisplay: "0.0",
      totalBountyCount: 0,
      totalSubmissionCount: 0,
      hasMoreBounties: false,
      hasMoreSubmissions: false,
      bounties: [],
      filteredBounties: [],
      submissions: [],
      filteredSubmissions: [],
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
