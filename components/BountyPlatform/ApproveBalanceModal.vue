<template>
  <!-- Approval Waiting -->
  <multi-purpose-modal
    v-if="approvalLoading"
    :header="$t('bountyPlatform.multiPurposeModal.approveAmount.header')"
    :paragraph="$t('bountyPlatform.multiPurposeModal.approveAmount.paragraph')"
    :imgSrc="require('~/assets/images/illustrations/foreground/devcash-d.svg')"
  />
  <!-- Approval Modal -->
  <div
    v-else
    v-on-clickaway="hideModal"
    @keydown.esc.exact="hideModal"
    class="w-full max-h-full flex flex-col items-center shadow-4xl overflow-auto bg-c-background-sec rounded-xl border-2 border-c-text-10 px-6 pt-4 pb-8 md:px-24 md:pt-8 md:pb-16 whitespace-initial"
  >
    <!-- Header -->
    <h5
      class="text-center font-bold text-2xl text-c-primary"
    >{{$t('bountyPlatform.sidebarContextual.headerApproveBalance')}}</h5>
    <!-- Paragraph -->
    <p class="text-center mt-1">{{$t('bountyPlatform.sidebarContextual.paragraphApproveBalance')}}</p>
    <!-- Divider -->
    <div class="w-full h-px2 rounded-full bg-c-text-10 mt-6 mb-7"></div>
    <!-- Amount to Approve  -->
    <label
      v-if="balance.primary.hasApproved"
      for="amountToApprove"
      class="text-c-text font-bold text-lg"
    >{{$t('bountyPlatform.sidebarContextual.amountToApprove')}}</label>
    <!-- Amount Input -->
    <div
      v-if="balance.primary.hasApproved"
      class="w-full max-w-xxs flex flex-row items-center relative mt-2 text-c-text"
    >
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
      :disabled="approvalLoading"
      @click="approveBalance"
      class="w-full max-w-xxs btn-primary bg-c-primary transform hover:scale-md focus:scale-md duration-200 ease-out transition-all origin-bottom-left text-c-light font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-1_5 mt-3"
    >{{$t('bountyPlatform.sidebarContextual.buttonApprove')}}</button>
    <p
      v-if="approvalError && balance.primary.hasApproved"
      class="text-c-danger text-xs px-3"
    >{{ approvalError }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { utils, BigNumber } from "ethers";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  props: {
    hideModal: Function
  },
  components: {
    MultiPurposeModal
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance"
    })
  },  
  data() {
    return {
      toApprove: null,
      approvalLoading: false,
      approvalError: ""
    }
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
        let avail = BigNumber.from(this.balance.primary.raw)
        if (amt.gt(avail)) {
          this.approvalError = this.$t('bountyplatform.sidebarContextual.approveAmountLow')
          return
        }
        this.approvalError = ""
        await this.$store.state.devcash.connector.approveBalance(this.toApprove)
        this.toApprove = ""
        this.$notify({
          group: 'main',
          title: this.$t('notification.approvalPending'),
          text: this.$t('notification.approvalDescription'),
          data: {}
        });
        this.hideModal()
      } catch (e) {
        console.log(e)
      } finally {
        this.approvalLoading = false
      }
    }    
  }
}
</script>
<style>
.whitespace-initial {
  white-space: initial;
}
</style>