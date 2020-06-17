<template>
  <nuxt-link
    :to="localePath({name:'bountyplatform-bounty-id', params: {id: bounty.id}})"
    :class="{
      'bg-dtBackgroundSecondary border-dtBackgroundSecondary border-dtBackgroundSecondary': $store.state.theme.dt && !type,
      'bg-ltBackgroundSecondary shadow-lg border-ltBackgroundSecondary border-ltBackgroundSecondary': !$store.state.theme.dt && !type,
      'bg-dtBackgroundTertiary border-dtBackgroundTertiary border-dtBackgroundTertiary': $store.state.theme.dt && type == 'secondary',
      'bg-ltBackgroundSecondary shadow-lgD border-ltBackgroundSecondary border-ltBackgroundSecondary': !$store.state.theme.dt && type == 'secondary'
    } "
    class="w-full flex flex-row flex-wrap justify-between items-center border-2 hover:border-dtPrimary focus:border-dtPrimary relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-4 pb-5 px-2 md:px-4 transition-colors duration-300 ease-out"
  >
    <!-- Bounty Name and Address -->
    <div class="w-full md:w-3/7 flex flex-col flex-wrap justify-center items-start px-4">
      <h4 class="font-extrabold text-xl text-left">{{ bounty.title }}</h4>
      <div class="flex flex-row items-center mt-1">
        <Jazzicon class="flex" :diameter="20" :address="bounty.bountyChest" />
        <h5 class="font-mono-jet text-md text-left ml-2 opacity-75">
          <span class="font-medium">
            {{
            bounty.bountyChest.substring(0, 6) +
            "..." +
            bounty.creator.substring(bounty.bountyChest.length - 4)
            }}
          </span>
          <span
            v-if="this.isLoggedIn && bounty.hunter == this.loggedInAccount"
            class="font-mono-jet text-sm opacity-50"
          >({{$t('bountyPlatform.bountyHunter.you')}})</span>
        </h5>
      </div>
    </div>
    <!-- Divider -->
    <div
      :class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
      class="md:hidden w-full h-px rounded-full opacity-5 my-3"
    ></div>
    <!-- Submissions Left and Remaining Time -->
    <div
      class="w-full md:w-2/7 flex flex-col justify-center order-last md:order-none items-start md:items-end px-4"
    >
      <!-- Submissions Left -->
      <div class="flex flex-row justify-end items-center">
        <Icon
          class="w-4 h-4 mr-1"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          type="award"
        />
        <h6 class="text-right text-sm">
          <span
            class="font-bold"
          >{{ `${bounty.submissions.filter(sub => sub.approved).length} of ${bounty.available}` }}</span>
          <span class="opacity-75">
            {{
            $t("bountyPlatform.bountyCard.bountiesLeft")
            }}
          </span>
        </h6>
      </div>
      <!-- Remaining Time -->
      <div class="flex flex-row justify-end items-center mt-1">
        <Icon
          class="w-4 h-4 mr-1"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          type="clock"
        />
        <h6 class="text-right text-sm">
          <span class="font-bold">{{ formatTimeLeft() }}</span>
          <span class="opacity-75">
            {{
            $t("bountyPlatform.bountyCard.remaining")
            }}
          </span>
        </h6>
      </div>
    </div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div class="w-full md:w-2/7 flex flex-col justify-center items-start md:items-end px-4">
      <h4
        class="text-dtPrimary font-extrabold text-xl text-left md:text-right"
      >{D}{{ formatAmount() }}</h4>
      <h5
        class="text-lg text-left md:text-right mt-1"
      >Ξ{{ formatEthAmount() }}</h5>
    </div>
    <!-- Divider -->
    <div
      :class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
      class="md:hidden w-full h-px rounded-full bg-dtText opacity-5 my-3"
    ></div>
  </nuxt-link>
</template>
<script>
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import { mapGetters } from "vuex";
import { utils } from 'ethers'
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
export default {
  components: {
    Icon,
    Jazzicon
  },
  props: {
    bounty: null,
    type: null
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    })
  },  
  methods: {
    formatAmount() {
      let tokenDecimals = 8
      if (this.$store.state.devcash.connector) {
          tokenDecimals = this.$store.state.devcash.connector.tokenDecimals
      }   
      return DevcashBounty.formatAmount(this.bounty, tokenDecimals)
    },
    formatEthAmount() {
      return utils.formatEther(this.bounty.weiAmount)
    },
    formatTimeLeft() {
      return DevcashBounty.formatTimeLeft(this.bounty)
    } 
  }
};
</script>
