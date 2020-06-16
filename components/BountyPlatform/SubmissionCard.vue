<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundTertiary border-dtText-10'
        : 'bg-ltBackgroundSecondary border-ltText-10 shadow-lgDL']"
      class="w-full flex flex-col flex-wrap justify-between items-center border rounded-lg overflow-hidden"
    >
      <!-- Top Part -->
      <div
        :class="[
      $store.state.theme.dt
        ? 'bg-dtText-5'
        : 'bg-ltText-5']"
        class="w-full flex flex-row flex-wrap justify-between items-center py-2"
      >
        <!-- Senders Address and Project Name -->
        <div class="w-full md:w-auto flex flex-row md:items-center px-4 py-2">
          <Jazzicon class="flex m-1" :diameter="20" :address="submission.creator" />
          <h5 class="text-left ml-2 mr-3">
            <span
              class="font-mono-jet font-bold"
            >{{submission.creator.substring(0, 6) + "..." + submission.creator.substring(submission.creator.length - 4)}}</span>
            <span
              v-if="perspective=='hunter' && submission.creator==loggedInAccount"
              class="font-mono-jet text-sm opacity-75"
            >({{$t('bountyPlatform.bountyHunter.you')}})</span>
            <span v-if="ubounty.title">-></span>
            <span v-if="ubounty.title" class="font-extrabold">{{ubounty.title}}</span>
          </h5>
        </div>
        <!-- Bounty Amount and Status Tag or Approve Decline Options -->
        <div class="w-full md:w-auto flex flex-row flex-wrap items-center px-4 md:pr-0">
          <!-- Bounty Amount in DEV, ETH and USD -->
          <div class="flex flex-col my-2">
            <h5
              :class="{
              'text-dtPending': (submission.status == 'revision requested' || submission.status == 'awaiting feedback') && $store.state.theme.dt,
              'text-ltPending': (submission.status == 'revision requested' || submission.status == 'awaiting feedback') && !$store.state.theme.dt,
              'text-dtSuccess': submission.status == 'approved' && $store.state.theme.dt,
              'text-ltSuccess': submission.status == 'approved' && !$store.state.theme.dt,
              'text-dtDanger': submission.status == 'rejected' && $store.state.theme.dt,
              'text-ltDanger': submission.status == 'rejected' && !$store.state.theme.dt}"
              class="font-bold text-left"
            >{D}{{formatAmount()}}</h5>
            <h6 class="text-sm text-left">(Ξ{{'1'}} / ${{'1'}})</h6>
          </div>
          <!-- Status Tag or Approve and Reject Buttons -->
          <div class="flex flex-col md:mx-4 my-2">
            <!-- If Perspective is Manager -->
            <div
              v-if="perspective=='manager' && (submission.status == 'revision requested' || submission.status == 'awaiting feedback')"
              class="flex flex-row flex-wrap items-center"
            >
              <!-- Approve Button -->
              <button
                :class="[$store.state.theme.dt?'hover_bg-dtSuccess-15 focus_bg-dtSuccess-15': 'hover_bg-ltSuccess-15 focus_bg-ltSuccess-15']"
                class="flex flex-row items-center transition-all rounded-full duration-200 ease-out px-3 py-1 mx-1 my-1"
              >
                <Icon
                  class="w-5 h-5"
                  type="done"
                  :colorClass="$store.state.theme.dt?'text-dtSuccess':'text-ltSuccess'"
                />
                <h5
                  :class="$store.state.theme.dt?'text-dtSuccess':'text-ltSuccess'"
                  class="font-extrabold mx-1"
                >{{$t('bountyPlatform.bountyManager.approve')}}</h5>
              </button>
              <!-- Reject Button -->
              <button
                :class="[$store.state.theme.dt?'hover_bg-dtDanger-15 focus_bg-dtDanger-15': 'hover_bg-ltDanger-15 focus_bg-ltDanger-15']"
                class="flex flex-row items-center transition-all rounded-full duration-200 ease-out px-3 py-1 mx-1 my-1"
              >
                <Icon
                  class="w-5 h-5"
                  type="cancel"
                  :colorClass="$store.state.theme.dt?'text-dtDanger':'text-ltDanger'"
                />
                <h5
                  :class="$store.state.theme.dt?'text-dtDanger':'text-ltDanger'"
                  class="font-extrabold mx-1"
                >{{$t('bountyPlatform.bountyManager.reject')}}</h5>
              </button>
            </div>
            <!-- If Perspective is Hunter -->
            <StatusTag :perspective="perspective" :status="getSimpleStatus()" v-if="perspective=='hunter'" />
          </div>
        </div>
      </div>
      <!-- Thin Status Bar -->
      <StatusDivider :status="getSimpleStatus()" />
      <!-- Bottom Part -->
      <div class="w-full flex flex-col px-4 md:px-6 py-6">
        <!-- Message -->
        <p class="break-all" v-html="submission.submission_data"></p>
        <!-- Date -->
        <p class="text-sm opacity-75 mt-6">{{ formatDateStr(currentLocale.iso) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import StatusTag from "~/components/BountyPlatform/StatusTag.vue";
import StatusDivider from "~/components/BountyPlatform/StatusDivider.vue";
export default {
  components: {
    Icon,
    Jazzicon,
    StatusTag,
    StatusDivider
  },
  props: {
    ubounty: Object,
    submission: Object,
    perspective: String,
  },
  computed: {
    // mix the getters into computed with object spread operator
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
    }    
  },
  methods: {
    formatDateStr(locale) {
      return DevcashBounty.formatDateStr(locale, this.submission.createdAt)
    },
    formatAmount() {
      let tokenDecimals = 8
      if (this.$store.state.devcash.connector) {
          tokenDecimals = this.$store.state.devcash.connector.tokenDecimals
      }   
      return DevcashBounty.formatAmountSingleSubmission(this.ubounty, tokenDecimals)
    },
    getSimpleStatus() {
      if (this.submission.status == 'revision requested' || this.submission.status == 'awaiting feedback') {
        return 'pending'
      }
      return this.submission.status
    }
  }  
};
</script>