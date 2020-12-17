<template>
  <div
    class="bg-c-background-sec w-full h-full rounded-tl-xl rounded-tr-xl md:rounded-tr-3xl md:rounded-bl-sm md:rounded-tl-sm md:rounded-br-3xl lg:rounded-tl-xl lg:rounded-bl-xl"
    @mouseenter="showSidebarTextOnMd()"
    @mouseleave="hideSidebarTextOnMd()"
  >
    <!-- Sidebar Content -->
    <div class="w-full flex flex-row md:flex-col justify-center py-0 md:py-8">
      <!-- Post -->
      <nuxt-link
        :to="localePath('bountyplatform-post')"
        class="flex flex-row justify-center md:justify-start items-center px-4 py-3 md:px-6 transition-colors ease-out duration-200"
        :class="[{
            'bg-c-primary': $store.state.sidebarContext == sidebarContexts.post,
            'hover:bg-c-primary-25 focus:bg-c-primary-25':  !($store.state.sidebarContext == sidebarContexts.post),
          }] "
      >
        <div class="w-7 h-7">
          <Icon
            type="post"
            :colorClass="$store.state.sidebarContext == sidebarContexts.post?'text-c-light':'text-c-text'"
            class="w-7 h-7"
          />
        </div>
        <h3
          :class="[$store.state.sidebarContext == sidebarContexts.post?'text-c-light':'text-c-text', isSidebarTextVisibleOnMd?'md:block':'lg:block']"
          class="text-lg font-bold hidden ml-2"
        >{{ $t("bountyPlatform.post.header") }}</h3>
      </nuxt-link>
      <!-- Explore -->
      <nuxt-link
        :to="localePath('bountyplatform')"
        class="flex flex-row justify-center md:justify-start items-center px-4 py-3 md:px-6 transition-colors ease-out duration-200"
        :class="[{
            'bg-c-primary': $store.state.sidebarContext == sidebarContexts.explore || $store.state.sidebarContext == sidebarContexts.singleBounty,
            'hover:bg-c-primary-25 focus:bg-c-primary-25':  !($store.state.sidebarContext == sidebarContexts.explore || $store.state.sidebarContext == sidebarContexts.singleBounty)
          }] "
      >
        <div class="w-7 h-7">
          <Icon
            :colorClass="$store.state.sidebarContext == sidebarContexts.explore || $store.state.sidebarContext == sidebarContexts.singleBounty?'text-c-light':'text-c-text'"
            type="explore"
            class="w-7 h-7"
          />
        </div>
        <h3
          :class="[$store.state.sidebarContext == sidebarContexts.explore || $store.state.sidebarContext == sidebarContexts.singleBounty?'text-c-light':'text-c-text', isSidebarTextVisibleOnMd?'md:block':'lg:block']"
          class="text-lg font-bold hidden ml-2"
        >{{ $t("bountyPlatform.explore.header") }}</h3>
      </nuxt-link>
      <!-- Overview -->
      <nuxt-link
        :to="localePath('bountyplatform-overview')"
        class="flex flex-row justify-center md:justify-start items-center px-4 py-3 md:px-6 transition-colors ease-out duration-200"
        :class="[{
            'bg-c-primary': $store.state.sidebarContext == sidebarContexts.overview,
            'hover:bg-c-primary-25 focus:bg-c-primary-25':  !($store.state.sidebarContext == sidebarContexts.overview)
          }]"
      >
        <div class="w-7 h-7">
          <Icon
            type="overview"
            :colorClass="$store.state.sidebarContext == sidebarContexts.overview?'text-c-light':'text-c-text'"
            class="w-7 h-7"
          />
        </div>
        <h3
          :class="[$store.state.sidebarContext == sidebarContexts.overview?'text-c-light':'text-c-text', isSidebarTextVisibleOnMd?'md:block':'lg:block']"
          class="text-lg font-bold hidden ml-2"
        >{{ $t("bountyPlatform.overview.header") }}</h3>
        <h3>{{ totalSubmissionCount }}</h3>

      </nuxt-link>
      <!-- Bounty Manager -->
      <nuxt-link
        :to="localePath('bountyplatform-bountymanager')"
        class="flex flex-row justify-center md:justify-start items-center px-4 py-3 md:px-6 transition-colors ease-out duration-200"
        :class="[{
            'bg-c-primary': $store.state.sidebarContext == sidebarContexts.bountyManager,
            'hover:bg-c-primary-25 focus:bg-c-primary-25':  !($store.state.sidebarContext == sidebarContexts.bountyManager)
          }] "
        v-show="isBountyManager"
        v-if="!bountiesLoading"
      >
        <div class="w-7 h-7" bountyManagerTab>
          <Icon
            type="bounty-manager"
            :colorClass="$store.state.sidebarContext == sidebarContexts.bountyManager?'text-c-light':'text-c-text'"
            class="w-7 h-7"
          />
        </div>
        <h3
          :class="[$store.state.sidebarContext == sidebarContexts.bountyManager?'text-c-light':'text-c-text', isSidebarTextVisibleOnMd?'md:block':'lg:block']"
          class="text-lg font-bold hidden ml-2"
        >{{ $t("bountyPlatform.bountyManager.header")}}</h3>
      </nuxt-link>
      <!-- Bounty Hunter-->
      <nuxt-link
        :to="localePath('bountyplatform-bountyhunter')"
        class="flex flex-row justify-center md:justify-start items-center px-4 py-3 md:px-6 transition-colors ease-out duration-200"
        :class="[{
            'bg-c-primary': $store.state.sidebarContext == sidebarContexts.bountyHunter,
            'hover:bg-c-primary-25 focus:bg-c-primary-25':  !($store.state.sidebarContext == sidebarContexts.bountyHunter)
          }] "
         v-show="isBountyHunter"
         v-if="!bountiesLoading"
      >
        <div class="w-7 h-7" id="bountyHunterTab">
          <Icon
            type="bounty-hunter"
            :colorClass="$store.state.sidebarContext == sidebarContexts.bountyHunter?'text-c-light':'text-c-text'"
            class="w-7 h-7"
          />
        </div>
        <h3
          :class="[$store.state.sidebarContext == sidebarContexts.bountyHunter?'text-c-light':'text-c-text', isSidebarTextVisibleOnMd?'md:block':'lg:block']"
          class="text-lg font-bold hidden ml-2"
        >{{ $t("bountyPlatform.bountyHunter.header") }}</h3>
      </nuxt-link>
      <!-- Divider -->
      <div
        :class="isSidebarTextVisibleOnMd?'md:block':'lg:block'"
        class="px-4 md:px-6 mt-4 mb-5 hidden"
      >
        <div class="bg-c-text w-full h-px2 rounded-full opacity-10"></div>
      </div>
      <!-- Context aware options -->
      <div :class="isSidebarTextVisibleOnMd?'md:block':'lg:block'" class="px-4 md:px-6 hidden">
        <!-- If context is Null -->
        <div v-if="$store.state.sidebarContext == null" class="flex flex-col"></div>
        <!-- If context is Explore -->
        <div v-if="$store.state.sidebarContext == sidebarContexts.explore" class="flex flex-col">
          <!-- Search Text and Search Bar -->
          <label
            for="searchBar"
            class="text-c-text text-lg font-bold"
          >{{$t("bountyPlatform.explore.sidebar.searchHeader")}}</label>
          <div class="flex flex-row relative mt-2">
            <Icon
              :colorClass="isSearchFocused?'text-c-primary':'text-c-text'"
              class="absolute h-5 w-5 transform -translate-y-1/2 top-1/2 ml-3"
              type="search"
            />
            <input
              id="searchBar"
              v-model="searchText"
              @focus="isSearchFocused=true"
              @blur="isSearchFocused=false"
              class="bg-c-background-sec border-c-text w-full font-bold border-2 focus:border-c-primary rounded-full transition-all duration-200 ease-out pl-10 pr-4 py-1_5"
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
              class="text-c-text text-lg font-bold mt-8 w-full flex flex-row items-center px-1 -mx-1 hover:bg-c-primary-15 focus:bg-c-primary-15 transition-colors duration-200 rounded-md"
            >
              {{$t("bountyPlatform.explore.sidebar.sortHeader")}}
              <Icon
                class="w-4 h-4 mx-1 transition-all ease-out duration-200"
                colorClass="text-c-text"
                type="arrow-down"
              />
            </button>
            <!-- Sort Modal -->
            <transition name="modalScaleTransition">
              <!-- Modal Wrapper -->
              <div
                v-on-clickaway="hideSortModal"
                class="origin-top-left absolute left-0 pt-2 z-50"
                v-if="isSortModalOpen"
              >
                <div
                  class="bg-c-text text-c-background w-48 flex flex-col relative shadow-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
                >
                  <!-- Descending Button -->
                  <button
                    @click="orderChanged('desc'); hideSortModalWithDelay()"
                    @keydown.esc.exact="hideSortModal"
                    :class="sortDirection == 'desc' ? 'bg-c-primary text-c-light': 'hover:bg-c-primary-25 focus:bg-c-primary-25'"
                    class="flex flex-row items-center py-2 transition-colors duration-200 ease-out"
                  >
                    <div class="ml-3 mr-2">
                      <Icon
                        :colorClass="sortDirection == 'desc' ?'text-c-light':'text-transparent'"
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
                    @click="orderChanged('asc'); hideSortModalWithDelay()"
                    @keydown.tab.exact="hideSortModal"
                    @keydown.esc.exact="hideSortModal"
                    :class="sortDirection == 'asc' ? 'bg-c-primary text-c-light': 'hover:bg-c-primary-25 focus:bg-c-primary-25'"
                    class="flex flex-row items-center py-2 transition-colors duration-200 ease-out"
                  >
                    <div class="ml-3 mr-2">
                      <Icon
                        :colorClass="sortDirection == 'asc' ?'text-c-light':'text-transparent'"
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
            :checked="this.sortType == 'recency'"
            class="mt-3 -ml-1"
            name="recency"
            :text="$t('bountyPlatform.explore.sidebar.sortRecency')"
            :changeCallback="sortChanged"
          />
          <RadioButton
            :checked="this.sortType == 'value'"
            class="mt-3 -ml-1"
            name="value"
            :text="$t('bountyPlatform.explore.sidebar.sortValue')"
            :changeCallback="sortChanged"
          />
          <RadioButton
            :checked="this.sortType == 'expiry'"
            class="mt-3 -ml-1"
            name="expiry"
            :text="$t('bountyPlatform.explore.sidebar.sortExpiry')"
            :changeCallback="sortChanged"
          />
          <!-- Status Text and Status Options -->
          <h4
            class="text-c-text text-lg font-bold mt-8"
          >{{$t("bountyPlatform.explore.sidebar.statusHeader")}}</h4>
          <CheckmarkButton
            :checked="status.active"
            :callback="activeCheckChanged"
            class="mt-3 -ml-1"
            :text="$t('bountyPlatform.explore.sidebar.statusActive')"
          />
          <CheckmarkButton
            :checked="status.completed"
            :callback="completedCheckChanged"
            class="mt-3 -ml-1"
            :text="$t('bountyPlatform.explore.sidebar.statusCompleted')"
          />
          <CheckmarkButton
            :checked="status.expired"
            :callback="expiredCheckChanged"
            class="mt-3 -ml-1"
            :text="$t('bountyPlatform.explore.sidebar.statusExpired')"
          />
        </div>
        <!-- If context is Post, Overview, Bounty Hunter or Bounty Manager -->
        <div
          v-else-if="isLoggedIn && ($store.state.sidebarContext == sidebarContexts.post || $store.state.sidebarContext == sidebarContexts.overview || $store.state.sidebarContext == sidebarContexts.bountyHunter ||  $store.state.sidebarContext == sidebarContexts.bountyManager)"
          class="flex flex-col"
        >
          <!-- Balance Text -->
          <h5
            v-if="!$store.state.devcashData.ethIsPrimary"
            class="text-c-text text-sm opacity-75"
          >{{$t('bountyPlatform.sidebarContextual.balance') }}</h5>
          <h4
            v-if="!$store.state.devcashData.ethIsPrimary"
            class="text-c-text font-extrabold text-lg mt-1 break-all mb-6"
          >{{ `${balance.primary.symbol}${balance.primary.amount ? balance.primary.amount: "N/A"}` }}</h4>
          <!-- Balance Approved -->
          <h5
            class="text-c-text text-sm opacity-75"
          >{{$t('bountyPlatform.sidebarContextual.approvedBalance')}}</h5>
          <h4
            class="font-extrabold text-c-primary text-xl mt-1 break-all"
          >{{ `${balance.primary.symbol}${balance.primary.approved ? balance.primary.approved: balance.primary.amount}` }}</h4>
          <h4
            class="text-sm mt-1 break-all font-medium"
          >{{ `+ ${balance.secondary.symbol}${balance.secondary.approved ? balance.secondary.approved: balance.secondary.amount}` }}</h4>
          <!-- Amount to Approve  -->
          <label
            v-if="balance.primary.hasApproved"
            for="amountToApprove"
            class="text-c-text font-bold mt-6"
          >{{$t('bountyPlatform.sidebarContextual.amountToApprove')}}</label>
          <!-- Amount Input -->
          <div v-if="balance.primary.hasApproved" class="flex flex-row items-center relative mt-2">
            <!-- Amount Symbol -->
            <span class="absolute top-1/2 transform -translate-y-1/2 ml-2 font-bold">{D}</span>
            <input
              v-model="toApprove"
              name="amountToApprove"
              class="bg-c-background-ter border-c-background-ter w-full font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out pr-4 pl-9 py-2"
              type="number"
              min="1"
              :placeholder="$t('bountyPlatform.sidebarContextual.amountToApprovePlaceholder')"
            />
          </div>
          <!-- Approve Button -->
          <button
            v-if="balance.primary.hasApproved"
            class="btn-primary bg-c-primary transform hover:scale-md focus:scale-md duration-200 ease-out transition-all origin-bottom-left text-c-light font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-1_5 mt-3"
            @click="approveBalance"
            :disabled="approvalLoading"
          >{{$t('bountyPlatform.sidebarContextual.buttonApprove')}}</button>
          <p
            :class="approvalError && balance.primary.hasApproved?'text-c-danger':'text-transparent'"
            class="text-c-danger text-xs px-1 mt-3"
          >{{ approvalError?approvalError:'&nbsp;' }}</p>
        </div>
        <!-- If context is Single Bounty -->
        <div
          v-else-if="$store.state.sidebarContext == sidebarContexts.singleBounty"
          class="flex flex-col"
        >
          <nuxt-link
            :to="localePath('bountyplatform')"
            class="btn-text bg-c-background-sec text-c-text border-2 border-c-text transform hover:scale-md focus:scale-md duration-200 ease-out transition-all origin-bottom-left flex flex-row justify-center items-center text-lg font-extrabold rounded-tl-xl rounded-br-xl rounded-tr rounded-bl pr-6 pl-4 py-1"
          >
            <Icon type="back" colorClass="text-c-text" class="h-5 w-5" />
            <h5 class="ml-1">{{$t('bountyPlatform.sidebarContextual.buttonGoBack')}}</h5>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- Approval Loading Modal -->
    <transition name="modalBgTransition">
      <div
        v-if="isApprovalLoadingModalVisible"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="max-w-xl h-full flex flex-row justify-center items-center px-2 pt-24 pb-12 md:pt-36"
        >
          <multi-purpose-modal
            :header="$t('bountyPlatform.multiPurposeModal.approveAmount.header')"
            :paragraph="$t('bountyPlatform.multiPurposeModal.approveAmount.paragraph')"
            :imgSrc="require('~/assets/images/illustrations/foreground/devcash-d.svg')"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { SIDEBAR_CONTEXTS } from "~/config";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
import { utils, BigNumber } from "ethers";
import Icon from "~/components/Icon.vue";
import RadioButton from "~/components/RadioButton.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  components: {
    Icon,
    RadioButton,
    CheckmarkButton,
    MultiPurposeModal
  },
  props: {
    bountyName: null
  },
  data() {
    return {
      hasMetamask: false,
      sidebarContexts: SIDEBAR_CONTEXTS,
      isSearchFocused: false,
      toApprove: null,
      approvalLoading: false,
      isApprovalLoadingModalVisible: false,
      approvalError: "",
      isSortModalOpen: false,
      searchText: "",
      isSidebarTextVisibleOnMd: false,
      openTimeout: null,
      isBountyManager: false,
      isBountyHunter: false,
      numPersonalBounties: 0,
      hasMetamask: false,
      confirmWindowOpen: false,
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
      totalBountyAmount: BigNumber.from("0"),
      totalBountyAmountDisplay: "0.0",
      totalBountyAmountSecondaryDisplay: "0.0",
      totalBountyCount: 0,
      totalSubmissionCount: 0,
      hasMoreBounties: false,
      hasMoreSubmissions: false,
      isConfirmModalOpen: false,
      confirmModalType: '',
      confirmModalItem: {},
      bounties: [],
      filteredBounties: [],
      submissions: [],
      filteredSubmissions: [],
    };
  },
  head(){
    return {
      bodyAttrs: {
        class: [ this.approvalLoading? 'overflow-hidden':'']
      }
    }
  },
  mounted() {
    this.hasMetamask = window.ethereum ? true : false
    if (this.isLoggedIn) {
      this.loadMoreBounties();
      this.loadMoreSubmissions();
    }
  },
  watch: {
    searchText: function() {
      this.$store.state.devcashData.exploreSearchText = this.searchText
      this.$root.$emit("filtersChanged")
    }
  },
  methods: {
    activeCheckChanged(checked) {
      this.$store.commit("devcashData/setStatus", {
        completed: this.status.completed,
        active: checked,
        expired: this.status.expired
      })
      this.$root.$emit('filtersChanged')
    },
    expiredCheckChanged(checked) {
      this.$store.commit("devcashData/setStatus", {
        completed: this.status.completed,
        active: this.status.active,
        expired: checked
      })
      this.$root.$emit('filtersChanged')
    },
    completedCheckChanged(checked) {
      this.$store.commit("devcashData/setStatus", {
        completed: checked,
        active: this.status.active,
        expired: this.status.expired
      })
      this.$root.$emit('filtersChanged')
    },    
    sortChanged(type) {
      this.$store.commit("devcashData/setSortType", type)
      this.$root.$emit('sortChanged')
    },
    orderChanged(direction) {
      if (direction != this.sortDirection) {
        this.$store.commit("devcashData/setSortDirection", direction)
        this.$root.$emit('sortChanged')
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
    showSidebarTextOnMd(){
      clearTimeout(this.openTimeout)
      this.openTimeout = setTimeout(() => {
        this.isSidebarTextVisibleOnMd = true
      }, 200);
    },
    hideSidebarTextOnMd(){
      clearTimeout(this.openTimeout)
      this.isSidebarTextVisibleOnMd = false
    },
    async approveBalance() {
      if (this.toApprove == null || this.toApprove < 0) {
        this.approvalError = this.$t('bountyPlatform.sidebarContextual.approveAmountRequired')
        return
      }
      try {
        this.approvalLoading = true
        await DevcashBounty.updateBalances(this)
        let amt = utils.parseUnits(this.toApprove.toString(), 8)
        let avail = BigNumber.from(this.balance.primary.raw)
        if (amt.gt(avail)) {
          this.approvalError = this.$t('bountyPlatform.sidebarContextual.approveAmountLow')
          return
        }
        this.approvalError = ""
        this.isApprovalLoadingModalVisible = true;
        await this.$store.state.devcash.connector.approveBalance(this.toApprove)
        this.toApprove = ""
        this.$notify({
          group: 'main',
          title: this.$t('notification.approvalPending'),
          text: this.$t('notification.approvalDescription'),
          data: {}
        });
      } catch (e) {
        console.log(e)
      } finally {
        this.approvalLoading = false
        this.isApprovalLoadingModalVisible = false;
      }
    },
    async loadMoreBounties() {
      this.page++;
      this.bountiesLoading = true;
      try {
        let res = await this.$axios.get(
          `/bounty/listcreated?page=${this.page}&limit=${50}&creator=${this.loggedInAccount}`
        );
      
        this.totalBountyCount = res.data.count;
        if(this.totalBountyCount>0){
          this.isBountyManager = true
        }
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
          `/submission/listhunter?limit=${50}&hunter=${this.loggedInAccount}`
        );

        let res2 = await this.$axios.get(
          `/bounty/listpersonal?page=${this.page}&limit=${50}&hunter=${this.loggedInAccount}`
        );
      
        //this.submissions = this.submissions.concat(res.data.items);
        //this.applySubmissionFilters()
        this.totalSubmissionCount = res.data.count;
        //this.totalSubmissionCount = this.submissions.length;

        this.numPersonalBounties = res2.data.count;

        if(this.totalSubmissionCount>0||this.numPersonalBounties>0){
          this.isBountyHunter = true
        }
        this.hasMoreSubmissions = this.totalSubmissionCount > this.submissions.length
      } catch (e) {
        this.submissionsPage--;
      } finally {
        this.initialSubmissionsLoading = false;
        this.submissionsLoading = false;
      }
    },
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance",
      sortType: "devcashData/exploreSortType",
      sortDirection: "devcashData/exploreOrderDirection",
      status: "devcashData/exploreStatus"
    })
  }
};
</script>
