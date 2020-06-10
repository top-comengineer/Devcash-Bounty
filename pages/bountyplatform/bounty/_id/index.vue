<template>
  <div class="w-full flex flex-col justify-center items-center">
    <!-- Submission Modal -->
    <transition
      name="modalBgTransition"
      @after-enter="isSubmissionModalContentVisible=true"
      @after-leave="isSubmissionModalContentVisible=false"
    >
      <div
        v-if="isSubmissionModalOpen"
        :class="$store.state.theme.dt?'bg-dtBackground-75':'bg-ltBackground-75'"
        class="w-full h-screen fixed flex flex-row justify-center items-center bg-ltText left-0 top-0 z-30"
      >
        <div
          class="d-container h-full flex flex-row justify-center items-center px-2 md:px-32 lg:px-48 pt-24 md:pt-30 pb-12"
        >
          <transition name="modalTransition">
            <SubmissionModal
              v-if="isSubmissionModalContentVisible"
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
        :class="$store.state.theme.dt?'bg-dtBackground-75':'bg-ltBackground-75'"
        class="w-full h-screen fixed flex flex-row justify-center items-center bg-ltText left-0 top-0 z-30"
      >
        <div
          class="d-container h-full flex flex-row items-center px-2 md:px-32 lg:px-48 pt-24 md:pt-30 pb-12"
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
      :class="[!$store.state.theme.dt?'shadow-lgS':'']"
      class="w-full flex flex-row flex-wrap justify-between items-center bg-dtPrimary text-dtText relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-2 pb-4 px-6 md:pt-4 md:pb-6 md:px-12 my-1 md:my-2"
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
        <h3
          class="text-lg md:text-xl text-left md:text-right mt-1"
        >{{ "Ξ" + '33.33' + " / " + "$" + '9000' }}</h3>
      </div>
    </div>
    <!-- Bounty Description and Hunt & Contribue Cards -->
    <div class="w-full flex flex-row flex-wrap">
      <!-- Bounty Description -->
      <div
        :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full md:w-auto flex-1 flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-6 pb-8 md:pt-8 md:pb-12 px-6 md:px-12 my-1 md:my-2"
      >
        <h4 class="font-extrabold text-2xl">{{$t("bountyPlatform.singleBounty.bountyDescription")}}</h4>
        <p class="mt-2 leading-loose">{{ bounty.description }}</p>
      </div>
      <!-- Divider -->
      <div class="w-4 hidden md:block"></div>
      <!-- Hunt & Contribute Card -->
      <div
        :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full md:w-auto md:max-w-xs flex flex-col flex-wrap relative overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg my-1 md:my-2"
      >
        <!-- Hunt and Contribute Button -->
        <div class="w-full flex flex-col items-center bg-dtSecondary px-6 py-4">
          <button
            @click="isSubmissionModalOpen = true"
            class="w-full hover_scale-md focus_scale-md bg-dtText text-dtSecondary btn-textSecondary font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
          >{{ $t("bountyPlatform.singleBounty.buttonHunt") }}</button>
          <button
            @click="isContributeModalOpen = true"
            class="w-full hover_scale-md focus_scale-md bg-dtSecondary text-dtText btn-textSecondary border-2 border-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2"
          >{{ $t("bountyPlatform.singleBounty.buttonContribute") }}</button>
        </div>
        <!-- Submissions Left and Remaining Time -->
        <div class="w-full flex flex-col px-6 py-6">
          <!-- Submissions Left -->
          <div class="flex flex-row items-center">
            <Icon
              class="w-4 h-4 mr-1"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="award"
            />
            <h6 class="text-sm">
              <span
                class="font-bold"
              >{{ bounty.submissions.filter(sub => sub.approved).length + ' of ' + this.bounty.numLeft }}</span>
              <span class="opacity-75">
                {{
                $t("bountyPlatform.bountyCard.bountiesLeft")
                }}
              </span>
            </h6>
          </div>
          <!-- Remaining Time -->
          <div class="flex flex-row items-center mt-1">
            <Icon
              class="w-4 h-4 mr-1"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="clock"
            />
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
      </div>
    </div>
    <!-- Submissions, Comments and Activity -->
    <div class="w-full flex flex-row flex-wrap">
      <div
        :class="[$store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full md:w-auto flex-1 flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-6 pb-8 md:pt-8 md:pb-12 px-4 md:px-12 my-1 md:my-2"
      >
        <!-- Submission, Comments and Activity Switch -->
        <div
          :class="$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtText-10':'bg-ltBackground border-ltText-10'"
          class="max-w-full lg:w-168 flex flex-row mt-2 mb-6 p-1 rounded-full border"
        >
          <div class="w-full flex flex-row relative">
            <div
              :class="{'left-0':activeTab=='submissions', 'left-1/2 -translate-x-1/2':activeTab=='comments', 'left-full -translate-x-full':activeTab=='activity', 'shadow-lgSS': $store.state.theme.dt, 'shadow-lgS': !$store.state.theme.dt}"
              class="absolute w-1/3 h-full w-24 bg-dtPrimary left-0 rounded-full transform transition-all duration-200 ease-out"
            ></div>
            <button
              :class="[activeTab=='submissions'?'text-dtText':'', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && activeTab !='submissions', 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && activeTab !='submissions' }]"
              @click="activeTab='submissions'"
              class="w-1/3 text-sm font-bold md:text-xl leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >
              Submissions
              <span class="text-sm font-light">(2)</span>
            </button>
            <button
              :class="[activeTab=='comments'?'text-dtText':'', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && activeTab !='comments', 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && activeTab !='comments' }]"
              @click="activeTab='comments'"
              class="w-1/3 text-sm font-bold md:text-xl leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >
              Comments
              <span class="text-sm font-light">(4)</span>
            </button>
            <button
              :class="[activeTab=='activity'?'text-dtText':'', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && activeTab !='activity', 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && activeTab !='activity' }]"
              @click="activeTab='activity'"
              class="w-1/3 text-sm font-bold md:text-xl leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >Activity</button>
          </div>
        </div>
        <!-- Submissions -->
        <div v-if="activeTab=='submissions'" class="w-full flex flex-col">
          <SubmissionCard
            class="my-2"
            perspective="hunter"
            context="singleBounty"
            status="pending"
            amountDEV="57,500"
            amountETH="0.127"
            amountUSD="34.5"
            address="0x0474f388b2910a30cb0b0fbb21f930a2c19248a8"
            message="Here is the link to my submission:<br><u>https://github.com/guy/submission</u>"
            date="03.16.2020, 14:40"
          />
          <SubmissionCard
            class="my-2"
            perspective="hunter"
            context="singleBounty"
            status="rejected"
            amountDEV="57,500"
            amountETH="0.127"
            amountUSD="34.5"
            address="0xa090e606e30bd747d4e6245a1517ebe430f0057e"
            message="Files are is attached to this submission."
            date="03.15.2020, 16:45"
          />
          <!-- Load More Button -->
          <!-- 
          <div class="flex flex-row justify-center mt-2">
          <button
            :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText']"
            class="text-lg hover_scale-lg focus_scale-lg font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
          -->
        </div>
        <!-- Comments -->
        <div v-if="activeTab=='comments'" class="w-full flex flex-col">
          <!-- New Comment -->
          <div class="w-full flex flex-row items-start flex-wrap mt-2 mb-6 lg:px-4">
            <!-- New Comment Input -->
            <textarea
              @input="autoGrow()"
              ref="commentArea"
              :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary hover:border-dtText focus:border-dtText active:border-dtText':'bg-ltBackgroundTertiary hover:border-ltText focus:border-ltText active:border-ltText']"
              class="commentArea w-full md:flex-1 text-lg font-bold border border-dtSecondary rounded-lg px-4 py-2 transition-colors duration-200"
              type="text"
              placeholder="Start writing a comment..."
            />
            <!-- Comment Button -->
            <button
              :class="$store.state.theme.dt?'btn-dtSecondary':'btn-ltSecondary'"
              class="w-full md:w-auto hover_scale-md focus_scale-md bg-dtSecondary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 mt-3 md:mt-0 md:ml-4"
            >{{ "Comment" }}</button>
          </div>
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
            :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText']"
            class="text-lg hover_scale-lg focus_scale-lg font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
          >{{ $t("bountyPlatform.buttonLoadMore") }}</button>
        </div>
          -->
        </div>
        <!-- Activity -->
        <div v-if="activeTab=='activity'" class="w-full flex flex-col">
          <ActivityCard
            class="my-2"
            perspective="general"
            messageType="submissionRejected"
            date="03.18.2020, 13:12"
            address="0xa090e606e30bd747d4e6245a1517ebe430f0057e"
          />
          <ActivityCard
            class="my-2"
            perspective="general"
            messageType="submissionMade"
            date="03.16.2020, 14:40"
            address="0x0474f388b2910a30cb0b0fbb21f930a2c19248a8"
          />
          <ActivityCard
            class="my-2"
            perspective="general"
            messageType="submissionMade"
            date="03.15.2020, 16:45"
            address="0xa090e606e30bd747d4e6245a1517ebe430f0057e"
          />
          <ActivityCard
            class="my-2"
            perspective="general"
            messageType="bountyCreated"
            date="03.14.2020, 12:30"
          />
          <!-- Load More Button -->
          <!-- 
          <div class="flex flex-row justify-center mt-2">
          <button
            :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText']"
            class="text-lg hover_scale-lg focus_scale-lg font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-6 py-1"
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
    autoGrow() {
      this.$refs.commentArea.style.height = "5px";
      this.$refs.commentArea.style.height =
        this.$refs.commentArea.scrollHeight + "px";
    },
    formatAmount() {
      let tokenDecimals = 8;
      if (!this.$store.state.devcash.connector) {
        this.initEthConnector();
      } else {
        tokenDecimals = this.$store.state.devcash.connector.tokenDecimals;
      }
      return DevcashBounty.formatAmount(this.bounty, tokenDecimals);
    },
    formatTimeLeft() {
      return DevcashBounty.formatTimeLeft(this.bounty);
    }
  },
  asyncData({ error, params, $axios }) {
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
      pagePreview: "https://devcash.netlify.app/previews/bounty-single.png",
      pageThemeColor: "#675CFF"
    };
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit(
      "general/setSidebarContext",
      SIDEBAR_CONTEXTS.singleBounty
    );
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
    this.isSubmissionModalOpen = false;
    this.isContributeModalOpen = false;
  },
  head() {
    return {
      title: "Devcash | Bounty Platform | " + this.bounty.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.bounty.description
        },
        // Google / Search Engine Tags
        {
          itemprop: "name",
          content: "Devcash | Bounty Platform | " + this.bounty.title
        },
        {
          itemprop: "description",
          content: this.bounty.description
        },
        {
          itemprop: "image",
          content: this.pagePreview
        },
        // Facebook Meta Tags
        {
          property: "og:url",
          content:
            "https://devcash.netlify.app/bountyplatform/bounty" + this.bounty.id
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: "Devcash | Bounty Platform | " + this.bounty.title
        },
        {
          property: "og:description",
          content: this.bounty.description
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
          content: "Devcash | Bounty Platform | " + this.bounty.title
        },
        {
          name: "twitter:description",
          content: this.bounty.description
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
          href:
            "https://devcash.netlify.app/bountyplatform/bounty/" +
            this.bounty.id
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
</style>