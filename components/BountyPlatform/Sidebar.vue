<template>
  <div
    :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary shadow-nlgS md:shadow-none'
        : 'bg-ltBackgroundSecondary shadow-nlg md:shadow-lg'
    ]"
    class="w-full h-full rounded-tl-xl rounded-tr-xl md:rounded-tr-3xl md:rounded-bl-sm md:rounded-tl-sm md:rounded-br-3xl lg:rounded-tl-xl lg:rounded-bl-xl transition-all ease-out duration-200"
  >
    <!-- Sidebar Content -->
    <div class="w-full flex flex-row md:flex-col justify-center py-0 md:py-8">
      <!-- Explore -->
      <nuxt-link
        :to="localePath('bountyplatform')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.explore || $store.state.general.sidebarContext == sidebarContexts.singleBounty,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.explore || $store.state.general.sidebarContext == sidebarContexts.singleBounty)
          }] "
      >
        <Icon
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.explore?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          type="explore"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3 class="text-lg font-bold hidden lg:block ml-2">{{ $t("bountyPlatform.explore.header") }}</h3>
      </nuxt-link>
      <!-- Post -->
      <nuxt-link
        v-if="isLoggedIn"
        :to="localePath('bountyplatform-post')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.post,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.post)
          }] "
      >
        <Icon
          type="post"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.post?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3 class="text-lg font-bold hidden lg:block ml-2">{{ $t("bountyPlatform.post.header") }}</h3>
      </nuxt-link>
      <!-- Overview -->
      <nuxt-link
        v-if="isLoggedIn"
        :to="localePath('bountyplatform-overview')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.overview,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.overview)
          }]"
      >
        <Icon
          type="overview"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.overview?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3
          class="text-lg font-bold hidden lg:block ml-2"
        >{{ $t("bountyPlatform.overview.header") }}</h3>
      </nuxt-link>
      <!-- Bounty Hunter-->
      <nuxt-link
        v-if="isLoggedIn"
        :to="localePath('bountyplatform-bountyhunter')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.bountyHunter,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.bountyHunter)
          }] "
      >
        <Icon
          type="bounty-hunter"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.bountyHunter?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3
          class="text-lg font-bold hidden lg:block ml-2"
        >{{ $t("bountyPlatform.bountyHunter.header") }}</h3>
      </nuxt-link>
      <!-- Bounty Manager -->
      <nuxt-link
        v-if="isLoggedIn"
        :to="localePath('bountyplatform-bountymanager')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.bountyManager,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.bountyManager)
          }] "
      >
        <Icon
          type="bounty-manager"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.bountyManager?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3
          class="text-lg font-bold hidden lg:block ml-2"
        >{{ $t("bountyPlatform.bountyManager.header") }}</h3>
      </nuxt-link>
      <!-- Divider -->
      <div class="px-4 lg:px-6 mt-4 mb-5 hidden lg:block">
        <div
          :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
          class="w-full h-px2 rounded-full opacity-10"
        ></div>
      </div>
      <!-- Context aware options -->
      <div class="px-4 lg:px-6 xl:pl-8 hidden lg:block">
        <!-- If context is Null -->
        <div v-if="$store.state.general.sidebarContext == null" class="flex flex-col"></div>
        <!-- If context is Explore -->
        <div
          v-if="$store.state.general.sidebarContext == sidebarContexts.explore"
          class="flex flex-col"
        >
          <!-- Search Text and Search Bar -->
          <h4 class="text-lg font-bold">{{$t("bountyPlatform.explore.sidebar.searchHeader")}}</h4>
          <div class="flex flex-row relative mt-2">
            <Icon
              :colorClass="{'text-dtPrimary': isSearchFocused,'text-dtText': $store.state.theme.dt && !isSearchFocused, 'text-ltText': !$store.state.theme.dt && !isSearchFocused}"
              class="absolute h-5 w-5 searchIcon ml-3"
              type="search"
            />
            <input
              @focus="isSearchFocused=true"
              @blur="isSearchFocused=false"
              :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary border-dtText':'bg-ltBackgroundSecondary border-ltText']"
              class="w-full font-bold border-2 focus:border-dtPrimary rounded-full transition-all duration-200 ease-out pl-10 pr-4 py-1_5"
              type="text"
              :placeholder="$t('bountyPlatform.explore.sidebar.searchPlaceholder')"
            />
          </div>
          <!-- Sort Text and Sort Options -->
          <div class="relative">
            <!-- Sort Button -->
            <button
              @click="toggleSortModal"
              @keydown.esc.exact="hideSortModal"
              class="text-lg font-bold mt-8 w-full flex flex-row items-center px-1 -mx-1 hover_bg-dtPrimary-15 focus_bg-dtPrimary-15 transition-colors duration-200 rounded-md"
            >
              {{$t("bountyPlatform.explore.sidebar.sortHeader")}}
              <Icon
                class="hidden lg:block w-4 h-4 mx-1 transition-all ease-out duration-200"
                :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
                type="arrow-down"
              />
            </button>
            <!-- Sort Modal -->
            <transition name="sortModalTransition">
              <!-- Modal Wrapper -->
              <div
                v-on-clickaway="hideSortModal"
                class="origin-top-left absolute left-0 pt-2 z-50"
                v-if="isSortModalOpen"
              >
                <div
                  :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
                  class="w-48 flex flex-col relative shadow-2xlS rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
                >
                  <!-- Descending Button -->
                  <button
                    @click="isSortDescending=true; hideSortModalWithDelay()"
                    @keydown.esc.exact="hideSortModal"
                    :class="isSortDescending ? 'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
                    class="flex flex-row items-center py-2 transition-colors duration-200 ease-out"
                  >
                    <div class="ml-3 mr-2">
                      <Icon
                        :colorClass="isSortDescending?'text-dtText':'text-transparent'"
                        type="done"
                        class="w-5 h-5"
                      />
                    </div>
                    <h6
                      class="whitespace-no-wrap font-bold"
                    >{{$t("bountyPlatform.explore.sidebar.sortDescending")}}</h6>
                  </button>
                  <!-- Ascending Button -->
                  <button
                    @click="isSortDescending=false; hideSortModalWithDelay()"
                    @keydown.tab.exact="hideSortModal"
                    @keydown.esc.exact="hideSortModal"
                    :class="!isSortDescending ? 'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
                    class="flex flex-row items-center py-2 transition-colors duration-200 ease-out"
                  >
                    <div class="ml-3 mr-2">
                      <Icon
                        :colorClass="!isSortDescending?'text-dtText':'text-transparent'"
                        type="done"
                        class="w-5 h-5"
                      />
                    </div>
                    <h6
                      class="whitespace-no-wrap font-bold"
                    >{{$t("bountyPlatform.explore.sidebar.sortAscending")}}</h6>
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <RadioButton
            checked="checked"
            class="mt-3 -ml-1"
            name="exploreRadioGroup"
            :text="$t('bountyPlatform.explore.sidebar.sortRecency')"
          />
          <RadioButton
            class="mt-3 -ml-1"
            name="exploreRadioGroup"
            :text="$t('bountyPlatform.explore.sidebar.sortValue')"
          />
          <RadioButton
            class="mt-3 -ml-1"
            name="exploreRadioGroup"
            :text="$t('bountyPlatform.explore.sidebar.sortExpiry')"
          />
          <!-- Status Text and Status Options -->
          <h4 class="text-lg font-bold mt-8">{{$t("bountyPlatform.explore.sidebar.statusHeader")}}</h4>
          <CheckmarkButton
            checked="checked"
            class="mt-3 -ml-1"
            :text="$t('bountyPlatform.explore.sidebar.statusActive')"
          />
          <CheckmarkButton
            class="mt-3 -ml-1"
            :text="$t('bountyPlatform.explore.sidebar.statusCompleted')"
          />
          <CheckmarkButton
            class="mt-3 -ml-1"
            :text="$t('bountyPlatform.explore.sidebar.statusExpired')"
          />
        </div>
        <!-- If context is Post, Overview, Bounty Hunter or Bounty Manager -->
        <div
          v-else-if="isLoggedIn && ($store.state.general.sidebarContext == sidebarContexts.post || $store.state.general.sidebarContext == sidebarContexts.overview || $store.state.general.sidebarContext == sidebarContexts.bountyHunter ||  $store.state.general.sidebarContext == sidebarContexts.bountyManager)"
          class="flex flex-col"
        >
          <!-- Balance Text -->
          <h5 class="text-sm opacity-75">{{$t('bountyPlatform.sidebarContextual.balance') }}</h5>
          <h4
            class="font-extrabold text-lg mt-1 break-all"
          >{{ `${balance.primary.symbol}${balance.primary.amount ? balance.primary.amount: "N/A"}` }}</h4>
          <!-- Balance in Devcash -->
          <h5
            class="text-sm mt-6 opacity-75"
          >{{$t('bountyPlatform.sidebarContextual.approvedBalance')}}</h5>
          <h4
            v-if="balance.primary.hasApproved"
            class="font-extrabold text-dtPrimary text-xl mt-1 break-all"
          >{{ `${balance.primary.symbol}${balance.primary.approved ? balance.primary.approved: "N/A"}` }}</h4>
          <!-- Amount to Approve  -->
          <h5 v-if="balance.primary.hasApproved" class="font-bold mt-6">{{$t('bountyPlatform.sidebarContextual.amountToApprove')}}</h5>
          <!-- Amount Input -->
          <input
            v-if="balance.primary.hasApproved"
            v-model="toApprove"
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="number"
            min="1"
            :placeholder="$t('bountyPlatform.sidebarContextual.amountToApprovePlaceholder')"
          />
          <!-- Approve Button -->
          <button
            v-if="balance.primary.hasApproved"
            :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
            class="hover_scale-md focus_scale-md bg-dtPrimary text-dtText font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-1_5 mt-3"
            @click="approveBalance"
            :disabled="approvalLoading"
          >{{$t('bountyPlatform.sidebarContextual.buttonApprove')}}</button>
          <p
            v-if="approvalError && balance.primary.hasApproved"
            :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
            class="text-xs px-3"
          >{{ approvalError }}</p>
        </div>
        <!-- If context is Single Bounty -->
        <div
          v-else-if="$store.state.general.sidebarContext == sidebarContexts.singleBounty"
          class="flex flex-col"
        >
          <nuxt-link
            :to="localePath('bountyplatform')"
            :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText'
        ]"
            class="flex flex-row justify-center items-center text-lg hover_scale-md focus_scale-md font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl pr-6 pl-4 py-1"
          >
            <Icon
              type="back"
              :colorClass="$store.state.theme.dt?'text-dtText':'text-ltText'"
              class="h-5 w-5"
            />
            <h5 class="ml-1">{{$t('bountyPlatform.sidebarContextual.buttonGoBack')}}</h5>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { SIDEBAR_CONTEXTS } from "~/config";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
import { utils } from "ethers";
import Icon from "~/components/Icon.vue";
import RadioButton from "~/components/RadioButton.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  components: {
    Icon,
    RadioButton,
    CheckmarkButton
  },
  props: {
    bountyName: null
  },
  data: function() {
    return {
      sidebarContexts: SIDEBAR_CONTEXTS,
      isSearchFocused: false,
      isSortDescending: true,
      isSortModalOpen: false,
      toApprove: null,
      approvalLoading: false,
      approvalError: ""
    };
  },
  methods: {
    async approveBalance() {
      if (this.toApprove == null || this.toApprove < 0) {
        this.approvalError = this.$t('bountyplatform.sidebarContextual.approveAmountRequired')
        return
      }
      try {
        this.approvalLoading = true
        await DevcashBounty.updateBalances(this)
        let amt = utils.parseUnits(this.toApprove.toString(), 8)
        let avail = utils.bigNumberify(this.$store.state.devcashData.balance.primary.raw)
        if (amt.gt(avail)) {
          this.approvalError = this.$t('bountyplatform.sidebarContextual.approveAmountLow')
          return
        }
        this.approvalError = ""
        await this.$store.state.devcash.connector.approveBalance(this.toApprove)
      } catch (e) {
        
      } finally {
        this.approvalLoading = false
      }
    },
    toggleSortModal() {
      this.isSortModalOpen = !this.isSortModalOpen;
    },
    hideSortModal() {
      this.isSortModalOpen = false;
    },
    hideSortModalWithDelay() {
      setTimeout(() => {
        this.isSortModalOpen = false;
      }, 50);
    },
    async updateBalance() {
      if (this.isLoggedIn && (this.$store.state.general.sidebarContext == this.sidebarContexts.post || this.$store.state.general.sidebarContext == this.sidebarContexts.overview || this.$store.state.general.sidebarContext == this.sidebarContexts.bountyHunter ||  this.$store.state.general.sidebarContext == this.sidebarContexts.bountyManager)) {
        await DevcashBounty.updateBalances(this)
        await DevcashBounty.updateFees(this)
      }
    }
  },
  cron: {
    time: 60000,
    method: 'updateBalance'
  },
  mounted() {
    this.updateBalance()
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance"
    })
  }
};
</script>
<style>
.searchIcon {
  top: 50%;
  transform: translateY(-50%);
}
.sortModalTransition-enter-active {
  transition: all 0.2s ease-out;
}
.sortModalTransition-leave-active {
  transition: all 0.2s ease-out;
}
.sortModalTransition-enter {
  opacity: 0.25;
  transform: scaleX(0.75) scaleY(0.25) translateY(-1rem);
}
.sortModalTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.75) scaleY(0.25) translateY(-1rem);
}
.z-999 {
  z-index: 999;
}
</style>
