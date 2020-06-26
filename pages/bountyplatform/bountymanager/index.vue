<template>
  <div class="w-full flex flex-row flex-wrap justify-center px-1 md:px-4">
    <div v-if="isLoggedIn" class="w-full flex flex-row flex-wrap justify-center">
      <!-- Confirm Modal -->
      <transition name="confirmModalTransition">
        <div
          v-if="isConfirmModalOpen"
          class="bg-c-background-75 w-full h-screen fixed flex flex-row left-0 top-0 modal"
        >
          <div
            class="d-container flex flex-col items-center justify-center px-2 md:px-12 lg:px-24 xl:px-48 pt-20 md:pt-24 pb-12 overflow-y-scroll"
          >
            <ConfirmModal
              address="0x569DE003A10dB0E057f009AA516673C418e7Fdf1"
              :type="confirmModalType"
              :item="confirmModalItem"
              :cancelCallback="closeConfirmModal"
              :confirmCallback="confirmConfirmModal"
            />
          </div>
        </div>
      </transition>
      <!-- Submissions Received Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mb-2"
      >
        <!-- Header Row -->
        <div class="flex flex-row flex-wrap justify-between items-center">
          <!-- Header -->
          <h2
            class="text-2xl font-extrabold mx-4 my-2"
          >{{$t('bountyPlatform.bountyManager.submissionsReceived')}}</h2>
          <!-- Checkboxes -->
          <div v-if="submissions.length>0 && !submissionsLoading" class="flex flex-row flex-wrap">
            <CheckmarkButton
              checked="checked"
              class="my-3 mx-3"
              :text="$t('bountyPlatform.statusTag.pending')"
            />
            <CheckmarkButton class="my-3 mx-3" :text="$t('bountyPlatform.statusTag.approved')" />
            <CheckmarkButton class="my-3 mx-3" :text="$t('bountyPlatform.statusTag.rejected')" />
          </div>
        </div>
        <!-- Submissions loading -->
        <div v-if="submissionsLoading">
          <SubmissionCardPlaceholder v-for="num in 2" :key="num" class="my-2" />
        </div>
        <!-- Submissions -->
        <div v-else-if="submissions.length>0" class="w-full flex flex-col flex-wrap my-4">
          <SubmissionCard
            class="my-2"
            perspective="manager"
            v-for="(item, i) in submissions"
            :key="i"
            :submission="item"
            :ubounty="item.ubounty"
            :approveClicked="() => showConfirmModal(item, 'approve')"
            :rejectClicked="() => showConfirmModal(item, 'reject')"
          />
        </div>
        <!-- If there are no submissions -->
        <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
          <img
            class="max-w-xxxs h-auto relative"
            :src="require('~/assets/images/illustrations/foreground/submission-received.svg')"
            alt="No Submissions Illustration"
          />
          <h6
            class="opacity-75 text-center mt-4 md:max-w-xs"
          >{{$t('bountyPlatform.bountyManager.noSubmissionsReceived')}}</h6>
          <!-- Post Bounties Call to Action -->
          <div class="flex flex-row justify-center">
            <nuxt-link
              :to="localePath('bountyplatform-post')"
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-6"
            >{{ $t("home.bountyPlatformSection.postBountyButton") }}</nuxt-link>
          </div>
        </div>
        <!-- Load More Button -->
        <div
          v-if="hasMoreSubmissions && !submissionsLoading"
          class="flex flex-row justify-center mt-2"
        >
          <button
            @click="loadMoreSubmissions()"
            class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
      </div>
      <!-- Your Bounties Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 my-2"
      >
        <!-- Header Row -->
        <div class="flex flex-row flex-wrap justify-between items-center">
          <!-- Header -->
          <h2
            class="text-2xl font-extrabold mx-4 my-2"
          >{{$t('bountyPlatform.bountyManager.yourBounties')}}</h2>
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
              <CheckmarkButton checked="checked" class="mx-3 my-2" text="Active" />
              <CheckmarkButton class="mx-3 my-2" text="Completed" />
              <CheckmarkButton class="mx-3 my-2" text="Expired" />
            </div>
          </div>
        </div>
        <!-- Bounties loading -->
        <div v-if="bountiesLoading">
          <BountyCardPlaceholder type="secondary" v-for="num in 4" :key="num" class="my-2" />
        </div>
        <!-- If there are bounties -->
        <div v-else-if="bounties.length>0" class="w-full flex flex-col flex-wrap my-4">
          <BountyCard
            type="secondary"
            v-for="(item, i) in bounties"
            :key="i"
            class="my-2"
            perspective="manager"
            :bounty="item"
          />
        </div>
        <!-- If there are no bounties -->
        <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
          <img
            class="max-w-xxxs h-auto relative"
            :src="require('~/assets/images/illustrations/foreground/bounty.svg')"
            alt="No Bounty Illustration"
          />
          <h6
            class="opacity-75 text-center mt-4 md:max-w-xs"
          >{{$t('bountyPlatform.bountyManager.noYourBounties')}}</h6>
          <!-- Post Bounties Call to Action -->
          <div class="flex flex-row justify-center">
            <nuxt-link
              :to="localePath('bountyplatform-post')"
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-6"
            >{{ $t("home.bountyPlatformSection.postBountyButton") }}</nuxt-link>
          </div>
        </div>
        <!-- Load More Button -->
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
import { utils } from "ethers";
import { mapGetters } from "vuex";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import SubmissionCardPlaceholder from "~/components/BountyPlatform/SubmissionCardPlaceholder.vue";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import BountyCardPlaceholder from "~/components/BountyPlatform/BountyCardPlaceholder.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";
import SignInToContinueWrapper from "~/components/BountyPlatform/SignInToContinueWrapper.vue";
import ConfirmModal from "~/components/BountyPlatform/ConfirmModal.vue";
import { DevcashBounty } from '../../../plugins/devcash/devcashBounty.client';

const defaultBountyLimit = 10;

export default {
  layout: "bountyPlatform",
  components: {
    SubmissionCard,
    SubmissionCardPlaceholder,
    BountyCard,
    BountyCardPlaceholder,
    CheckmarkButton,
    SignInToContinueWrapper,
    ConfirmModal
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    })
  },
  methods: {
    closeConfirmModal(){
      this.isConfirmModalOpen = false;
    },
    async confirmConfirmModal(feedback, submission, type){
      await DevcashBounty.initEthConnector(this)
      try {
      if (type == 'reject') {
        await this.$store.state.devcash.connector.reject(submission.ubounty.id, submission.submission_id, feedback)
        this.$store.state.devcashData.pendingSubStatus.push({
          bounty: submission.ubounty.id,
          submission: submission.submission_id,
          type: 'reject'
        })
        this.$notify({
          group: 'main',
          title: this.$t('notification.submissionRejectedTitle'),
          text: this.$t('notification.submissionRejectedApprovedDescription'),
          data: {}
        });            
      } else {
        await this.$store.state.devcash.connector.approve(submission.ubounty.id, submission.submission_id, feedback)
        this.$store.state.devcashData.pendingSubStatus.push({
          bounty: submission.ubounty.id,
          submission: submission.submission_id,
          type: 'approve'
        })
        this.$notify({
          group: 'main',
          title: this.$t('notification.submissionApprovedTitle'),
          text: this.$t('notification.submissionRejectedApprovedDescription'),
          data: {}
        });        
      }
      } catch (e) {
        console.log(e)
        // TODO - error handling
      } finally {
        this.isConfirmModalOpen = false;
      }
    },
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
          `/submission/listcreator?page=${this.submissionsPage}&limit=${defaultBountyLimit}&creator=${this.loggedInAccount}`
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
    },
    showConfirmModal(submission, type) {
      this.confirmModalType = type
      this.confirmModalItem = submission
      this.isConfirmModalOpen = true
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.loadMoreBounties();
      this.loadMoreSubmissions();
    }
  },
  activated() {
    // Set sidebar context
    this.$store.commit(
      "setSidebarContext",
      SIDEBAR_CONTEXTS.bountyManager
    );
  },
  deactivated() {
    this.$store.commit("setSidebarContext", null);
  },
  data() {
    return {
      initialBountiesLoading: true,
      initialSubmissionsLoading: true,
      bountiesLoading: true,
      submissionsLoading: true,
      page: 0,
      submissionsPage: 0,
      totalBountyAmount: utils.bigNumberify("0"),
      totalBountyAmountDisplay: "0.0",
      totalBountyCount: 0,
      totalSubmissionCount: 0,
      hasMoreBounties: false,
      hasMoreSubmissions: false,
      isConfirmModalOpen: false,
      confirmModalType: '',
      confirmModalItem: {},
      bounties: [],
      submissions: [],
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
      bodyAttrs: {
        class: [ this.isConfirmModalOpen? 'overflow-hidden':'']
      },
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
<style>
.confirmModalTransition-enter-active {
  transition: all 0.25s ease-out;
}
.confirmModalTransition-leave-active {
  transition: all 0.25s ease-out;
}
.confirmModalTransition-enter {
  opacity: 0;
}
.confirmModalTransition-leave-to {
  opacity: 0;
}
</style>
