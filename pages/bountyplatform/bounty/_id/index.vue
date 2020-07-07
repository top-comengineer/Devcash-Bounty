<template>
  <div class="w-full flex flex-col justify-center items-center px-1 md:px-4">
    <!-- Submission Modal -->
    <transition name="modalBgTransition">
      <div
        v-if="isSubmissionModalOpen"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="d-container h-full flex flex-row justify-center items-center px-2 md:px-12 lg:px-24 xl:px-32 pt-20 md:pt-24 pb-12"
        >
          <SubmissionModal :bounty="bounty" :closeModal="closeSubmissionModal" />
        </div>
      </div>
    </transition>
    <!-- Contribute Modal -->
    <transition name="modalBgTransition">
      <div
        v-if="isContributeModalOpen"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal overflow-visible"
      >
        <div
          class="d-container h-full flex flex-row items-center px-2 md:px-32 lg:px-48 pt-24 md:pt-30 pb-12 overflow-visible"
        >
          <ContributeModal :bounty="bounty" :closeModal="closeContributeModal" />
        </div>
      </div>
    </transition>
    <!-- Confirm Modal -->
    <transition name="modalBgTransition">
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
    <!-- Header Card -->
    <div
      class="shadow-lg w-full flex flex-row flex-wrap justify-between items-center bg-c-primary text-c-light relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-2 pb-4 px-6 md:pt-4 md:pb-6 md:px-12 mb-1 md:mb-2"
    >
      <!-- Status Tag -->
      <BountyCardStatusTag class="absolute top-0 transform -translate-y-1/2" :type="status" />
      <!-- Bounty Name, Creator Avatar & Address -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-start my-3">
        <!-- Header -->
        <h1 class="font-extrabold text-2xl md:text-3xl">{{ bounty.title }}</h1>
        <!-- Avatar & Address -->
        <div class="flex flex-row items-center mt-1">
          <Jazzicon class="flex mr-2" :diameter="24" :address="bounty.bountyChest" />
          <a
            :href="'https://etherscan.io/address/'+bounty.bountyChest"
            class="hover:underline mr-1"
            target="_blank"
          >
            <h3 class="font-mono-jet font-medium text-lg md:text-xl">
              {{
              bounty.bountyChest.substring(0, 6) +
              "..." +
              bounty.bountyChest.substring(bounty.bountyChest.length - 4)
              }}
            </h3>
          </a>
          <button
            @click.prevent="copyAddress(bounty.bountyChest)"
            class="w-8 h-8 rounded-full hover:bg-c-text-15 focus:bg-c-text-15 p-1 transition-colors duration-200"
          >
            <icon colorClass="text-c-text" class="w-full h-full" type="copy" />
          </button>
        </div>
      </div>
      <!-- Bounty Amount in Devcash, ETH & USD -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end my-3">
        <!-- Bounty Amount in Devcash -->
        <h2
          class="font-extrabold text-2xl md:text-3xl text-left md:text-right"
        >{{$store.state.devcashData.balancePrimary.symbol}}{{$store.state.devcashData.ethIsPrimary?ethAmount:amount}}</h2>
        <!-- Bounty Amount in ETH & USD -->
        <h3
          class="text-lg md:text-xl text-left md:text-right mt-1"
        >+ {{$store.state.devcashData.balanceSecondary.symbol}}{{$store.state.devcashData.ethIsPrimary?amount:ethAmount}}</h3>
      </div>
    </div>
    <!-- Bounty Description and Hunt & Contribue Cards -->
    <div class="w-full flex flex-row flex-wrap">
      <!-- Bounty Description -->
      <div
        class="bg-c-background-sec shadow-lg w-full md:w-auto flex-1 flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-6 pb-8 md:pt-10 md:pb-12 px-6 md:px-12 my-1 md:my-2"
      >
        <div class="editor-content" v-html="sanitizedDescription" />
      </div>
      <!-- Divider -->
      <div class="w-4 hidden md:block"></div>
      <!-- Hunt & Contribute Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full md:w-auto md:max-w-xs flex flex-col flex-wrap relative overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg my-1 md:my-2"
      >
        <!-- Hunt and Contribute Button or Completed or Expired Placeholders -->
        <div
          :class="status == 'completed'?'bg-c-success':status == 'expired'?'bg-c-pending':'bg-c-secondary'"
          class="w-full flex flex-col items-center px-6 py-4"
        >
          <!-- If status is active and logged in -->
          <div v-if="status=='active' && isLoggedIn" class="w-full flex flex-col items-center">
            <button
              @click="isSubmissionModalOpen = true"
              class="w-full transform hover:scale-lg focus:scale-lg transition-all duration-200 ease-out origin-bottom-left bg-c-light text-c-secondary btn-text-sec font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
            >{{ $t("bountyPlatform.singleBounty.buttonHunt") }}</button>
            <button
              @click="isContributeModalOpen = true"
              class="w-full transform hover:scale-lg focus:scale-lg transition-all duration-200 ease-out origin-bottom-left bg-c-secondary text-c-light btn-text-sec border-2 border-c-light font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
            >{{ $t("bountyPlatform.singleBounty.buttonContribute") }}</button>
          </div>
          <!-- If status is active and not logged in -->
          <div
            v-else-if="status=='active' && !isLoggedIn"
            class="w-full flex flex-col items-center"
          >
            <p
              class="text-c-light font-bold text-xl text-center"
            >{{$t("bountyPlatform.singleBounty.signInToHunt") }}</p>
            <button
              @click.prevent="toggleSignInModal"
              class="w-full transform hover:scale-lg focus:scale-lg transition-all duration-200 ease-out origin-bottom-left bg-c-light text-c-secondary btn-text-sec font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 mt-4 mb-2"
            >{{$t("navigation.signIn") }}</button>
            <button
              @click="isContributeModalOpen = true"
              class="w-full transform hover:scale-lg focus:scale-lg transition-all duration-200 ease-out origin-bottom-left bg-c-secondary text-c-light btn-text-sec border-2 border-c-light font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
            >{{ $t("bountyPlatform.singleBounty.buttonContribute") }}</button>
            <!-- Sign In Modal -->
            <transition name="modalBgTransition">
              <div
                v-if="isSignInModalOpen && !isLoggedIn"
                class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
              >
                <div
                  class="w-full md:max-w-xl h-full flex flex-row justify-center items-center px-2 pt-16 pb-12"
                >
                  <sign-in-card
                    v-on-clickaway="closeSignInModal"
                    :closeModal="closeSignInModal"
                    type="sign"
                  />
                </div>
              </div>
            </transition>
          </div>
          <!-- If status is completed -->
          <div
            v-else-if="status=='completed'"
            class="text-c-background font-extrabold text-lg flex flex-col items-center justify-center"
          >
            <icon type="done" colorClass="text-c-background" class="w-12 h-12 md:w-16 md:h-16" />
            <p class="mt-1 mb-2">{{$t("bountyPlatform.singleBounty.bountyCompleted")}}</p>
          </div>
          <!-- If status is expired -->
          <div
            v-else-if="status=='expired'"
            class="text-c-background font-extrabold text-lg flex flex-col items-center justify-center"
          >
            <icon type="clock" colorClass="text-c-background" class="w-12 h-12 md:w-16 md:h-16" />
            <p class="mt-1 mb-2">{{$t("bountyPlatform.singleBounty.bountyExpired")}}</p>
            <!-- Reclaim Funds button -->
            <button
              v-if="isReclaimable"
              @click.prevent="reclaim"
              class="bg-c-background text-c-pending btn-background text-lg transform hover:scale-lg focus:scale-lg font-bold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1_5 mt-1 mb-1"
            >{{ $t("bountyPlatform.singleBounty.buttonReclaimFunds") }}</button>
            <!-- Reclaim Waiting -->
            <transition name="modalBgTransition">
              <div
                v-if="isReclaimable && reclaimConfirmWindowOpen"
                class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
              >
                <div
                  class="max-w-xl h-full flex flex-row justify-center items-center px-2 pt-24 pb-12 md:pt-36"
                >
                  <multi-purpose-modal
                    :header="$t('bountyPlatform.multiPurposeModal.reclaim.header')"
                    :paragraph="$t('bountyPlatform.multiPurposeModal.reclaim.paragraph')"
                    :imgSrc="require('~/assets/images/illustrations/foreground/devcash-d.svg')"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- Submissions Left and Remaining Time -->
        <div class="w-full flex flex-col px-6 py-6">
          <!-- Submissions Left -->
          <div class="text-left text-sm">
            <Icon class="w-4 h-4 mb-0_5 mr-1 inline-block" colorClass="text-c-text" type="award" />
            <span class="font-bold">{{`${bounty.available}` }}</span>
            <span class="opacity-75">
              {{
              $t("bountyPlatform.bountyCard.bountiesLeft")
              }}
            </span>
          </div>
          <!-- Remaining Time -->
          <div class="text-left text-sm mt-2">
            <Icon class="w-4 h-4 mb-0_5 mr-1 inline-block" colorClass="text-c-text" type="clock" />
            <span v-if="status=='active'" class="font-bold">{{ formatTimeLeft() }}</span>
            <span
              v-else-if="status=='expired'"
              class="font-bold"
            >{{ $t('bountyPlatform.bountyCard.tag.expired') }}</span>
            <span v-else class="font-bold">{{ $t('bountyPlatform.bountyCard.tag.completed') }}</span>
            <span v-if="status == 'active'" class="opacity-75">
              {{
              $t("bountyPlatform.bountyCard.remaining")
              }}
            </span>
          </div>
        </div>
        <!-- Created By Text And Creator Card -->
        <div class="w-full flex flex-col px-6 pb-6 mt-2">
          <!-- Creator Card -->
          <CreatorCard
            :name="bounty.contactName"
            :email="bounty.contactEmail"
            :address="bounty.creator"
          />
        </div>
        <!-- Category of the Bounty -->
        <div class="w-full flex flex-row px-6 pb-6">
          <h5>
            <span class="opacity-75">{{$t("bountyPlatform.explore.categories.category") + ' '}}</span>
            <span
              class="border border-c-text-10 shadow-lg font-bold opacity-100 px-3 py-1 rounded-full"
            >{{$t(`bountyPlatform.explore.categories.${bounty.category}Tag`)}}</span>
          </h5>
        </div>
      </div>
    </div>
    <!-- Submissions, Comments and Activity -->
    <div class="w-full flex flex-row flex-wrap">
      <div
        class="bg-c-background-sec shadow-lg w-full md:w-auto flex-1 flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-6 pb-8 md:pt-8 md:pb-12 px-4 md:px-12 my-1 md:my-2"
      >
        <!-- Submission, Comments and Activity Switch -->
        <div
          class="bg-c-background-ter border-c-text-10 max-w-full lg:w-168 flex flex-row mt-2 mb-6 p-1 rounded-full border"
        >
          <div class="w-full flex flex-row relative">
            <div
              :class="{'left-0':activeTab=='submissions', 'left-1/2 -translate-x-1/2':activeTab=='comments', 'left-full -translate-x-full':activeTab=='activity'}"
              class="shadow-lg absolute w-1/3 h-full bg-c-primary left-0 rounded-full transform transition-all duration-200 ease-out"
            ></div>
            <button
              :class="[activeTab=='submissions'?'text-c-light':'hover:bg-c-text-15 focus:bg-c-text-15']"
              @click="activeTab='submissions'"
              class="w-1/3 text-sm font-bold md:text-xl leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >
              {{
              $t("bountyPlatform.singleBounty.submissions.headerSubmissions")
              }}
              <span
                class="text-sm font-light"
              >({{ bounty.submissions.length }})</span>
            </button>
            <button
              :class="[activeTab=='comments'?'text-c-light':'hover:bg-c-text-15 focus:bg-c-text-15']"
              @click="activeTab='comments'"
              class="w-1/3 text-sm font-bold md:text-xl leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >
              {{
              $t("bountyPlatform.singleBounty.comments.headerComments")
              }}
              <!--
              <DisqusCount tag="span" class="text-sm font-light" :identifier="disqusID()" />-->
            </button>
            <button
              :class="[activeTab=='activity'?'text-c-light':'hover:bg-c-text-15 focus:bg-c-text-15']"
              @click="activeTab='activity'"
              class="w-1/3 text-sm font-bold md:text-xl leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >
              {{
              $t("bountyPlatform.singleBounty.activity.headerActivity")
              }}
            </button>
          </div>
        </div>
        <!-- Submissions -->
        <div v-if="activeTab=='submissions'" class="w-full">
          <div v-if="submissions.length>0" class="w-full flex flex-col">
            <!-- If there are submissions -->
            <SubmissionCard
              class="my-2"
              :perspective="bounty.creator == loggedInAccount ? 'manager' : 'hunter'"
              v-for="(item, i) in submissions"
              :key="i"
              :submission="item"
              :ubounty="bounty"
              :approveClicked="() => showConfirmModal(item, 'approve')"
              :rejectClicked="() => showConfirmModal(item, 'reject')"
            />
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
          <!-- If there are no submissions -->
          <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
            <img
              class="max-w-xxxs h-auto relative mt-2"
              :src="require('~/assets/images/illustrations/foreground/submission-received.svg')"
              alt="No Submissions Illustration"
            />
            <h6
              class="opacity-75 text-center mt-4 md:max-w-xs"
            >{{$t('bountyPlatform.singleBounty.submissions.noSubmissions')}}</h6>
            <!-- Hunt Call to Action -->
            <div class="flex flex-row justify-center">
              <button
                @click="isSubmissionModalOpen = true"
                class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-6"
              >{{$t("bountyPlatform.singleBounty.buttonHunt")}}</button>
            </div>
          </div>
        </div>
        <!-- Comments -->
        <div v-if="activeTab=='comments'" class="w-full flex flex-col">
          <Disqus :key="$store.state.theme" :pageConfig="{identifier: disqusID}" />
        </div>
        <!-- Activity -->
        <div v-if="activeTab=='activity'" class="w-full flex flex-col">
          <ActivityCard
            v-if="status == 'completed' && bounty.activity.length > 0"
            class="my-2"
            perspective="general"
            messageType="bountyCompleted"
            :bountyName="bounty.title"
            :date="formatDate(bounty.activity[bounty.activity.length - 1]).createdAt"
          />          
          <ActivityCard
            class="my-2"
            perspective="general"
            v-for="(item, i) in bounty.activity"
            :item="item"
            :key="i"
            :messageType="item.status == 'rejected' ? 'submissionRejected' : item.approved ? 'submissionApproved' : item.type ? item.type : 'submissionMade'"
            :address="item.creator"
            :date="formatDate(item.createdAt)"
          />
          <ActivityCard
            class="my-2"
            perspective="general"
            messageType="bountyCreated"
            :date="formatDate(bounty.createdAt)"
          />

          <!-- Load More Button -->
          <!-- 
          <div class="flex flex-row justify-center mt-2">
          <button
      
            class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
import { utils } from "ethers";
import { mapGetters } from "vuex";
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import SubmissionCard from "~/components/BountyPlatform/SubmissionCard.vue";
import CommentCard from "~/components/BountyPlatform/CommentCard.vue";
import ActivityCard from "~/components/BountyPlatform/ActivityCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
import CreatorCard from "~/components/BountyPlatform/CreatorCard.vue";
import BountyCardStatusTag from "~/components/BountyPlatform/BountyCardStatusTag.vue";
import SubmissionModal from "~/components/BountyPlatform/SubmissionModal.vue";
import ContributeModal from "~/components/BountyPlatform/ContributeModal.vue";
import ConfirmModal from "~/components/BountyPlatform/ConfirmModal.vue";
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import SignInCard from "~/components/BountyPlatform/SignInCard.vue";
import marked from 'marked';
import { mixin as clickaway } from "vue-clickaway";

const defaultSubmissionsLimit = 10;

export default {
  layout: "bountyPlatform",
  mixins: [clickaway],
  components: {
    GreetingCard,
    SubmissionCard,
    CommentCard,
    ActivityCard,
    CTACard,
    Jazzicon,
    Icon,
    CreatorCard,
    BountyCardStatusTag,
    SubmissionModal,
    ContributeModal,
    MultiPurposeModal,
    SignInCard,
    ConfirmModal
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    }),    
    currentLocale() {
      for (let locale of this.$i18n.locales) {
        if (locale.code == this.$i18n.locale) {
          return locale;
        }
      }
    },
    sanitizedDescription() {
      let renderer = new marked.Renderer()
      renderer.link = function( href, title, text ) {
        return `<a target="_blank" href="${!href.startsWith('http://') && !href.startsWith('https://') ? `https://${href}` : href}" title="${title}">${text}</a>`;
      }
      return this.$sanitize(marked(this.bounty.description, {renderer: renderer}))
    },
    amount() {
      return DevcashBounty.formatAmountSingleSubmission(this.bounty, 8);      
    },
    ethAmount() {
      return DevcashBounty.formatAmountSingleSubmissionEth(this.bounty)
    },
    status() {
      if (new Date().getTime() / 1000 >= this.bounty.deadline) {
        return "expired"
      } else  if (this.bounty.submissions.filter(sub => sub.status == 'approved').length >= this.bounty.available) {
        return"completed"
      }
      return "active"
    },
    isReclaimable() {
      if (this.$store.state.devcashData.pendingReclaim.includes(this.bounty.id)) {
        return false
      }
      return (this.isLoggedIn && this.bounty && this.bounty.creator.toLowerCase() == this.loggedInAccount.toLowerCase() && this.bounty.available > 0 && this.status == 'expired')
    },
    disqusID() {
      return `devcash:${process.env.NODE_ENV}-bounty-${this.bounty.id}`
    },    
  },
  methods: {
    formatDate(dtStr) {
      return DevcashBounty.formatDateStr(this.currentLocale.iso, dtStr)
    },
    autoGrow() {
      this.$refs.commentArea.style.height = "5px";
      this.$refs.commentArea.style.height =
        this.$refs.commentArea.scrollHeight + "px";
    },
    formatTimeLeft() {
      return DevcashBounty.formatTimeLeft(this.bounty);
    },
    async reclaim() {
      if (!this.isReclaimable) {
        return
      }
      await DevcashBounty.initEthConnector(this, this.hasMetamask)
      try {
        this.reclaimConfirmWindowOpen = true
        await this.$store.state.devcash.connector.reclaim(this.bounty)
        this.$store.state.devcashData.pendingReclaim.push(this.bounty.id)
        this.$notify({
          group: 'main',
          title: this.$t('notification.reclaimTitle'),
          text: this.$t('notification.reclaimDescription'),
          data: {},
          duration: -1,
        });            
      } catch (e) {
        if ('code' in e && e.code == 4001) {
          console.log(e)
        } else {
          this.$notify({
            group: 'main',
            title: this.$t('errors.reclaimFailed'),
            text: this.$t('errors.reclaimFailedDesc'),
            data: {}
          })
          console.log(e)
        }
      } finally {
        this.reclaimConfirmWindowOpen = false
      }
    },
    async loadMoreSubmissions() {
      this.page++;
      this.submissionsLoading = true;
      try {
        let res = await this.$axios.get(
          `/submission/list?page=${this.page}&limit=${defaultSubmissionsLimit}&bounty=${this.bounty.id}`
        );
        this.submissions = this.submissions.concat(res.data.items);
        this.totalSubmissionCount = res.data.count;
        this.hasMoreSubmissions = this.totalSubmissionCount > this.submissions.length
      } catch (e) {
        this.submissionsPage--;
      } finally {
        this.submissionsLoading = false;
      }
    },
    toggleSignInModal() {
      this.isSignInModalOpen = !this.isSignInModalOpen;
    },
    closeSignInModal() {
      this.isSignInModalOpen = false;
    },
    closeSubmissionModal(){
      this.isSubmissionModalOpen = false
    },
    closeContributeModal(){
      this.isContributeModalOpen = false
    },
    showConfirmModal(submission, type) {
      this.confirmModalType = type
      this.confirmModalItem = submission
      this.confirmModalItem.ubounty = this.bounty
      this.isConfirmModalOpen = true
    },
    closeConfirmModal(){
      this.isConfirmModalOpen = false;
    },
    async confirmConfirmModal(feedback, submission, type){
      await DevcashBounty.initEthConnector(this, this.hasMetamask)
      await DevcashBounty.approveRejectAction(this, type, submission, feedback)
    },
    copyAddress(address) {
      this.$copyText(address);
      this.$notify({
          group: 'main',
          title: this.$t("bountyPlatform.singleBounty.contribute.headerAddressCopied"),
          text: this.$t("bountyPlatform.singleBounty.contribute.paragraphAddressCopied"),
          data: {},
          duration: 1500
        });
    }
  },
  async asyncData({ error, params, $axios }) {
    try {
      let res = await $axios.get(`/bounty/one?id=${params.id}`)
      let submissions = await $axios.get(`/submission/list?bounty=${params.id}&page=1&limit=${defaultSubmissionsLimit}`)
      res.data.submissions.sort((a, b) => {
        let aDt = new Date(a.createdAt)
        let bDt = new Date(b.createdAt)
        if (aDt < bDt) {
          return 1
        }
        return -1
      })
      return {
        bounty: res.data,
        submissionsLoading: false,
        page: 1,
        totalSubmissionCount: submissions.data.count,
        hasMoreSubmissions: submissions.data.count > submissions.data.items.length,
        submissions: submissions.data.items,
      }
    } catch (e) {
      throw e
      return error({
        statusCode: 404,
        message: `Bounty "${params.id}" not found`
      });      
    }
    return $axios
      .get(`/bounty/one?id=${params.id}`)
      .then(res => {
        return {
          bounty: res.data
        };
      })
      .catch(e => {
        return error({
          statusCode: 404,
          message: `Bounty "${params.id}" not found`
        });
      });
  },
  mounted() {
    this.hasMetamask = window.ethereum ? true : false;
    this.$root.$on("newSubmission", (objR) => {
      if (this.bounty.id == objR.bounty && this.submissions.filter((sub) => sub.id == objR.submission.id).length == 0) {
        this.submissions.unshift(objR.submission)
      }
    })
    // Auto update submission statuses
    this.$root.$on("subApproved", (objR) => {
      for (const submission of this.submissions) {
        if (submission.ubounty_id == objR.bounty && submission.submission_id == objR.submission) {
          submission.status = 'approved'
          if (objR.feedback && objR.feedback.length > 0) {
            submission.feedback = objR.feedback
          }          
        }
      }
    })
    this.$root.$on("subRejected", (objR) => {
      for (const submission of this.submissions) {
        if (submission.ubounty_id == objR.bounty && submission.submission_id == objR.submission) {
          submission.status = 'rejected'
          if (objR.feedback && objR.feedback.length > 0) {
            submission.feedback = objR.feedback
          }          
        }
      }
    })     
  },
  data() {
    return {
      hasMetamask: false,
      activeTab: "submissions",
      reclaimConfirmWindowOpen: false,
      isSubmissionModalOpen: false,
      isContributeModalOpen: false,
      isSignInModalOpen: false,
      isConfirmModalOpen: false,
      confirmModalType: '',
      confirmModalItem: {},      
      // For meta tags
      pagePreview: `${process.env.BASE_URL}/previews/bounty-single.png`,
      pageThemeColor: "#675CFF",
    };
  },
  activated() {
    // Set sidebar context
    this.$store.commit(
      "setSidebarContext",
      SIDEBAR_CONTEXTS.singleBounty
    );
  },
  deactivated() {
    this.activeTab = "submissions"
    this.$store.commit("setSidebarContext", null);
    this.isSubmissionModalOpen = false;
    this.isContributeModalOpen = false;
  },
  head() {
    return {
      title:
        this.$t("meta.bountyPlatform.pageTitle") + " | " + this.bounty.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.bounty.descriptionMeta
        },
        // Google / Search Engine Tags
        {
          itemprop: "name",
          content:
            this.$t("meta.bountyPlatform.pageTitle") + " | " + this.bounty.title
        },
        {
          itemprop: "description",
          content: this.bounty.descriptionMeta
        },
        {
          itemprop: "image",
          content: this.pagePreview
        },
        // Facebook Meta Tags
        {
          property: "og:url",
          content: process.env.CANONICAL_URL
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content:
            this.$t("meta.bountyPlatform.pageTitle") + " | " + this.bounty.title
        },
        {
          property: "og:description",
          content: this.bounty.descriptionMeta
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
          content:
            this.$t("meta.bountyPlatform.pageTitle") + " | " + this.bounty.title
        },
        {
          name: "twitter:description",
          content: this.bounty.descriptionMeta
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
          href: process.env.CANONICAL_URL
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
      ],
      bodyAttrs: {
        class: [ this.isSubmissionModalOpen || this.isContributeModalOpen || this.isConfirmModalOpen ? 'overflow-hidden':'']
      }
    };
  }
};
</script>
<style>
.commentArea {
  min-height: 3rem;
  height: 3rem;
  max-height: 9rem;
  transform-origin: center top;
}
</style>