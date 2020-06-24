<template>
  <div class="w-full flex flex-col justify-center items-center px-1 md:px-4">
    <!-- Submission Modal -->
    <transition
      name="modalBgTransition"
      @after-enter="isSubmissionModalContentVisible=true"
      @after-leave="isSubmissionModalContentVisible=false"
    >
      <div
        v-if="isSubmissionModalOpen"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="d-container h-full flex flex-row justify-center items-center px-2 md:px-12 lg:px-24 xl:px-48 pt-20 md:pt-24 pb-12"
        >
          <transition name="modalTransition">
            <SubmissionModal
              v-if="isSubmissionModalContentVisible"
              :bounty="bounty"
              :closeModal="() => this.isSubmissionModalOpen = false"
            />
          </transition>
        </div>
      </div>
    </transition>
    <!-- Contribute Modal -->
    <transition
      name="modalBgTransition"
      @after-enter="isContributeModalContentVisible=true"
      @after-leave="isContributeModalContentVisible=false"
    >
      <div
        v-if="isContributeModalOpen"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal overflow-visible"
      >
        <div
          class="d-container h-full flex flex-row items-center px-2 md:px-32 lg:px-48 pt-24 md:pt-30 pb-12 overflow-visible"
        >
          <transition name="modalTransition">
            <ContributeModal
              v-if="isContributeModalContentVisible"
              :closeModal="() => this.isContributeModalOpen = false"
            />
          </transition>
        </div>
      </div>
    </transition>
    <!-- Header Card -->
    <div
      class="shadow-lg w-full flex flex-row flex-wrap justify-between items-center bg-c-primary text-c-light relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-2 pb-4 px-6 md:pt-4 md:pb-6 md:px-12 my-1 md:my-2"
    >
      <!-- Status Tag -->
      <BountyCardStatusTag class="absolute top-0 transform -translate-y-1/2" type="active" />
      <!-- Bounty Name, Creator Avatar & Address -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-start my-3">
        <!-- Header -->
        <h1 class="font-extrabold text-2xl md:text-3xl">{{ bounty.title }}</h1>
        <!-- Avatar & Address -->
        <div class="flex flex-row items-center mt-1">
          <Jazzicon class="flex" :diameter="24" :address="bounty.bountyChest" />
          <h3 class="font-mono-jet font-medium text-lg md:text-xl ml-2">
            {{
            bounty.bountyChest.substring(0, 6) +
            "..." +
            bounty.bountyChest.substring(bounty.bountyChest.length - 4)
            }}
          </h3>
        </div>
      </div>
      <!-- Bounty Amount in Devcash, ETH & USD -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end my-3">
        <!-- Bounty Amount in Devcash -->
        <h2
          class="font-extrabold text-2xl md:text-3xl text-left md:text-right"
        >{{ '{D}' + formatAmount() }}</h2>
        <!-- Bounty Amount in ETH & USD -->
        <h3 class="text-lg md:text-xl text-left md:text-right mt-1">{{ "Ξ" + formatEthAmount() }}</h3>
      </div>
    </div>
    <!-- Bounty Description and Hunt & Contribue Cards -->
    <div class="w-full flex flex-row flex-wrap">
      <!-- Bounty Description -->
      <div
        class="bg-c-background-sec shadow-lg w-full md:w-auto flex-1 flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-6 pb-8 md:pt-8 md:pb-12 px-6 md:px-12 my-1 md:my-2"
      >
        <h4 class="font-extrabold text-2xl">{{$t("bountyPlatform.singleBounty.bountyDescription")}}</h4>
        <p
          class="mt-2 leading-loose"
        >{{ bounty.description + "asdasasdlfasdlfhlkasdhfkjsadhflkjasdlkfjalskdjflkasdjflkjsdalkfjaldskjflksajdflkasjdflkajsdklsdfjlasdjfkladsjklfsadfasdfasdfhjasdkjhfkajshdfkjhasdkjf" }}</p>
      </div>
      <!-- Divider -->
      <div class="w-4 hidden md:block"></div>
      <!-- Hunt & Contribute Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full md:w-auto md:max-w-xs flex flex-col flex-wrap relative overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg my-1 md:my-2"
      >
        <!-- Hunt and Contribute Button -->
        <div class="w-full flex flex-col items-center bg-c-secondary px-6 py-4">
          <button
            @click="isSubmissionModalOpen = true"
            class="w-full transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left bg-c-light text-c-secondary btn-text-sec font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
          >{{ $t("bountyPlatform.singleBounty.buttonHunt") }}</button>
          <button
            @click="isContributeModalOpen = true"
            class="w-full transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left bg-c-secondary text-c-light btn-text-sec border-2 border-c-light font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
          >{{ $t("bountyPlatform.singleBounty.buttonContribute") }}</button>
        </div>
        <!-- Submissions Left and Remaining Time -->
        <div class="w-full flex flex-col px-6 py-6">
          <!-- Submissions Left -->
          <div class="flex flex-row items-center">
            <Icon class="w-4 h-4 mr-1" colorClass="text-c-text" type="award" />
            <h6 class="text-sm">
              <span
                class="font-bold"
              >{{ `${bounty.available - bounty.submissions.filter(sub => sub.status == 'approved').length} of ${bounty.available}` }}</span>
              <span class="opacity-75">
                {{
                $t("bountyPlatform.bountyCard.bountiesLeft")
                }}
              </span>
            </h6>
          </div>
          <!-- Remaining Time -->
          <div class="flex flex-row items-center mt-1">
            <Icon class="w-4 h-4 mr-1" colorClass="text-c-text" type="clock" />
            <h6 class="text-sm">
              <span class="font-bold">{{ formatTimeLeft() }}</span>
              <span class="opacity-75">
                {{
                $t("bountyPlatform.bountyCard.remaining")
                }}
              </span>
            </h6>
          </div>
        </div>
        <!-- Created By Text And Creator Card -->
        <div class="w-full flex flex-col px-6 pb-6">
          <h5 class="text-lg font-bold">{{$t("bountyPlatform.singleBounty.createdBy")}}</h5>
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
              class="shadow-lg absolute w-1/3 h-full w-24 bg-c-primary left-0 rounded-full transform transition-all duration-200 ease-out"
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
              <span
                class="text-sm font-light"
              >(4)</span>
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
              perspective="hunter"
              v-for="(item, i) in submissions"
              :key="i"
              :submission="item"
              :ubounty="bounty"
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
                class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md font-extrabold transition-all ease-out duration-200 origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-6"
              >{{$t("bountyPlatform.singleBounty.buttonHunt")}}</button>
            </div>
          </div>
        </div>
        <!-- Comments -->
        <div v-if="activeTab=='comments'" class="w-full flex flex-col">
          <!-- New Comment -->
          <div class="w-full flex flex-row items-start flex-wrap mt-2 mb-6 lg:px-4">
            <!-- New Comment Input -->
            <textarea
              @input="autoGrow()"
              ref="commentArea"
              class="bg-c-background-ter hover:border-c-text focus:border-c-text commentArea w-full md:flex-1 text-lg font-bold border-2 border-c-secondary rounded-lg px-4 py-2 transition-colors duration-200"
              type="text"
              :placeholder="$t('bountyPlatform.singleBounty.comments.inputCommentPlaceholder')"
            />
            <!-- Comment Button -->
            <button
              class="btn-secondary bg-c-secondary text-c-light transform hover:scale-md focus:scale-md font-extrabold transition-all ease-out duration-200 origin-bottom-left w-full md:w-auto font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 mt-3 md:mt-0 md:ml-4"
            >{{ $t('bountyPlatform.singleBounty.comments.buttonComment') }}</button>
          </div>
          <!-- If there are comments -->
          <div v-if="true" class="w-full flex flex-col">
            <CommentCard
              class="my-2"
              perspective="hunter"
              context="singleBounty"
              address="0x903d7b2c8c4e18128a22da150f82f16f8b9d5d30"
              message="This is cool!"
              date="03.19.2020, 13:58"
            />
            <CommentCard
              class="my-2"
              perspective="hunter"
              context="singleBounty"
              status="rejected"
              address="0x8a91c9a16cd62693649d80afa85a09dbbdcb8508"
              message="Can’t wait for it to be live 🙂"
              date="03.19.2020, 13:39"
            />
            <CommentCard
              class="my-2"
              perspective="hunter"
              context="singleBounty"
              status="rejected"
              address="0xe224152ebb6e6bd44de79a0c194a367cd59c8d78"
              message="Did someone start working on it already?"
              date="03.18.2020, 12:22"
            />
            <CommentCard
              class="my-2"
              perspective="hunter"
              context="singleBounty"
              status="rejected"
              address="0x1fa9c39d07688308006a5fd976983bcc60eadb41"
              message="Wow, this is awesome!"
              date="03.18.2020, 12:15"
            />
            <!-- Load More Button -->
            <!-- 
          <div class="flex flex-row justify-center mt-2">
          <button
      
            class="bg-c-background-sec text-c-text border-2 border-c-text btn-text text-lg transform hover:scale-lg focus:scale-lg font-extrabold transition-all ease-out duration-200 origin-bottom-left rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
            -->
            <!-- If there are no comments -->
          </div>
          <div v-else class="w-full flex flex-col justify-center items-center flex-wrap">
            <img
              class="max-w-xxs h-auto relative -mt-5"
              :src="require('~/assets/images/illustrations/foreground/comment.svg')"
              alt="Comment Illustration"
            />
            <h6
              class="opacity-75 text-center -mt-5 mb-5 md:max-w-xs"
            >{{$t('bountyPlatform.singleBounty.comments.noComments')}}</h6>
          </div>
        </div>
        <!-- Activity -->
        <div v-if="activeTab=='activity'" class="w-full flex flex-col">
          <ActivityCard
            class="my-2"
            perspective="general"
            v-for="(item, i) in bounty.submissions"
            :key="i"
            :messageType="item.status == 'rejected' ? 'submissionRejected' : item.approved ? 'submissionApproved' : 'submissionMade'"
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

const defaultSubmissionsLimit = 10;

export default {
  layout: "bountyPlatform",
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
    ContributeModal
  },
  computed: {
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
    autoGrow() {
      this.$refs.commentArea.style.height = "5px";
      this.$refs.commentArea.style.height =
        this.$refs.commentArea.scrollHeight + "px";
    },
    formatAmount() {
      let tokenDecimals = 8;
      if (!this.$store.state.devcash.connector) {
        DevcashBounty.initEthConnector(this);
      } else {
        tokenDecimals = this.$store.state.devcash.connector.tokenDecimals;
      }
      return DevcashBounty.formatAmount(this.bounty, tokenDecimals);
    },
    formatEthAmount() {
      return utils.formatEther(this.bounty.weiAmount)
    },
    formatTimeLeft() {
      return DevcashBounty.formatTimeLeft(this.bounty);
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
  data() {
    return {
      activeTab: "submissions",
      isSubmissionModalContentVisible: false,
      isContributeModalContentVisible: false,
      isSubmissionModalOpen: false,
      isContributeModalOpen: false,
      // For meta tags
      pagePreview: `${process.env.BASE_URL}/previews/bounty-single.png`,
      pageThemeColor: "#675CFF"
    };
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit(
      "setSidebarContext",
      SIDEBAR_CONTEXTS.singleBounty
    );
  },
  destroyed() {
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
        class: [ this.isSubmissionModalOpen || this.isContributeModalOpen? 'overflow-hidden':'']
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
.modalBgTransition-enter-active {
  transition: all 0.075s ease-out;
}
.modalBgTransition-leave-active {
  transition: all 0.075s ease-out;
}
.modalBgTransition-enter {
  opacity: 0;
}
.modalBgTransition-leave-to {
  opacity: 0;
}
.modalTransition-enter-active {
  transition: all 0.15s ease-out;
}
.modalTransition-leave-active {
  transition: all 0.15s ease-out;
}
.modalTransition-enter {
  opacity: 0;
  transform: scale(0.85);
}
.modalTransition-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
.modal {
  z-index: 200;
}
</style>