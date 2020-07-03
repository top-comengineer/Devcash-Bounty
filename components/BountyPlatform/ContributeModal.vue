<template>
  <!-- Contribute Approval Waiting -->
  <div v-if="contributeLoading" class="w-full max-w-xl flex flex-row justify-center mx-auto">
    <multi-purpose-modal
      class="mx-auto"
      :header="$t('bountyPlatform.multiPurposeModal.contribute.header')"
      :paragraph="$t('bountyPlatform.multiPurposeModal.contribute.paragraph')"
      :imgSrc="require('~/assets/images/illustrations/foreground/devcash-d.svg')"
      :hasSpinner="true"
    />
  </div>
  <div
    v-else
    class="bg-c-background-sec shadow-4xl overflow-auto w-full max-h-full justify-center rounded-tl-4xl rounded-br-4xl rounded-tr-2xl rounded-bl-2xl px-4 py-3 md:px-5 md:py-4 relative"
  >
    <!-- Close Button -->
    <div class="absolute top-0 right-0 z-40">
      <button
        @mouseover="isCloseHovered = true"
        @mouseleave="isCloseHovered = false"
        @focus="isCloseFocused = true"
        @blur="isCloseFocused = false"
        @click="closeModal()"
        class="bg-c-background-sec fixed closeButton p-3 md:p-4 transform -translate-x-full z-40"
      >
        <Icon
          :class="isCloseHovered || isCloseFocused ? 'scale-120' : 'scale-100'"
          colorClass="text-c-text"
          class="w-6 h-6 md:w-8 md:h-8 transition-all duration-200 ease-out transform"
          type="cancel"
        />
      </button>
    </div>
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.singleBounty.contribute.cardHeader')"
      :paragraph="$t('bountyPlatform.singleBounty.contribute.cardParagraph')"
      type="contribute"
      class="my-1 md:my-2"
    />
    <!-- Card for Amount -->
    <div
      class="bg-c-background-sec shadow-xl w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 mt-1 md:mt-2 mb-2"
    >
      <!-- Pick an amount -->
      <div class="w-full flex flex-row flex-wrap">
        <!-- Header -->
        <div class="w-full flex flex-row justify-center items-center mt-4">
          <!-- Line Left -->
          <div class="bg-c-text flex-1 h-px2 opacity-10 rounded-tl-full rounded-br-full"></div>
          <!-- Header Text -->
          <h5
            class="font-bold text-xl text-center leading-tight px-6"
          >{{ $t("bountyPlatform.singleBounty.contribute.pickAmount") }}</h5>
          <!-- Line Right -->
          <div class="bg-c-text flex-1 h-px2 opacity-10 rounded-bl-full"></div>
        </div>
        <!-- Amount Buttons -->
        <div class="w-full flex flex-row flex-wrap justify-center my-2">
          <!-- {D}10,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
              :disabled="contributeLoading"
              @click="() => preFillClicked(10000)"
              class="text-c-light btn-secondary w-full transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}10,000" }}</button>
          </div>
          <!-- {D}20,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
              :disabled="contributeLoading"
              @click="() => preFillClicked(20000)"
              class="text-c-light btn-secondary w-full transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}20,000" }}</button>
          </div>
          <!-- {D}40,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
              :disabled="contributeLoading"
              @click="() => preFillClicked(40000)"
              class="text-c-light btn-secondary w-full transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}40,000" }}</button>
          </div>
        </div>
      </div>
      <!-- Or enter a custom one-->
      <div class="w-full my-4 flex flex-col items-center">
        <!-- Header -->
        <div class="w-full flex flex-row justify-center items-center mt-6">
          <!-- Line Left -->
          <div class="bg-c-text flex-1 h-px2 opacity-10 rounded-tl-full rounded-br-full"></div>
          <!-- Header Text -->
          <label for="customAmount" class="font-bold text-xl text-center leading-tight px-6">
            {{
            $t("bountyPlatform.singleBounty.contribute.orEnterCustomAmount")
            }}
          </label>
          <!-- Line Right -->
          <div class="bg-c-text flex-1 h-px2 opacity-10 rounded-bl-full"></div>
        </div>
        <!-- Custom Amount -->
        <div class="w-full lg:w-2/3 flex flex-col mt-8 mb-2 mx-auto">
          <div class="w-full flex flex-row justify-center items-start flex-wrap">
            <!-- Enter Amount -->
            <div class="w-full md:flex-1 flex flex-row items-center relative">
              <!-- Amount Symbol -->
              <span class="absolute top-1/2 transform -translate-y-1/2 ml-2 text-lg font-bold">{D}</span>
              <input
                id="customAmount"
                class="bg-c-background-ter hover:border-c-text focus:border-c-text active:border-c-text commentArea w-full md:flex-1 text-lg font-bold border-2 border-c-secondary rounded-lg pl-10 pr-4 py-2 transition-colors duration-200"
                type="number"
                v-model="customAmount"
                :placeholder="
              $t(
                'bountyPlatform.singleBounty.contribute.customAmountPlaceholder'
              )
            "
                @focus="amountError?amountError=false:null"
                @blur="() => validateAmount(customAmount)"
              />
            </div>
            <!-- Contribute Button -->
            <button
              :disabled="contributeLoading"
              @click="contributeClicked"
              class="text-c-light btn-secondary w-full md:w-auto transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 mt-3 md:mt-0 md:ml-4"
            >{{ $t("bountyPlatform.singleBounty.contribute.buttonContribute") }}</button>
          </div>
          <p class="text-c-danger text-xs px-3 mt-1_5">{{ amountError?amountError:'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Divider -->
      <div class="bg-c-text w-full h-px2 opacity-10 rounded-tl-full rounded-br-full"></div>
      <!-- Bounty Address & QR Card -->
      <div class="w-full flex flex-row justify-center mt-8">
        <div>
          <BountyAddressCard :address="bounty.bountyChest" :qrValue="bounty.bountyChest" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import BountyAddressCard from "~/components/BountyPlatform/BountyAddressCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import Icon from "~/components/Icon.vue";
import { utils, BigNumber } from "ethers"
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import { mapGetters } from "vuex";

export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    BountyAddressCard,
    CTACard,
    Icon,
    MultiPurposeModal
  },
  props: {
    closeModal: Function,
    bounty: Object
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance"
    }),  
  },
  data() {
    return {
      isCloseHovered: false,
      isCloseFocused: false,
      customAmount: null,
      amountError: "",
      contributeLoading: false,
      confirmWindowOpen: false
    };
  },
  methods: {
    validateAmount(amount){
      let isValid = true
      try {
        let amountBigNum, balanceBigNum
        amountBigNum = utils.parseUnits(amount.toString(), 8)
        if (this.$store.state.devcashData.ethIsPrimary) {
          balanceBigNum = BigNumber.from(this.balance.secondary.approvedRaw) 
        } else {
          balanceBigNum = BigNumber.from(this.balance.primary.approvedRaw)       
        }
        if (amountBigNum.gt(balanceBigNum) || amountBigNum.eq(BigNumber.from(0))) {
          this.amountError = this.$t('bountyPlatform.post.insufficientBalance')
          isValid = false
        } else {
          this.amountError = ""
        }
      } catch (e) {
        this.amountError = this.$t('bountyPlatform.post.invalidAmount')
        isValid = false
        console.log(e)
      }
      return isValid
    },
    async contributeClicked() {
      if (this.validateAmount(this.customAmount)) {
        let contributeAmount = utils.parseUnits(this.customAmount.toString(), 8)
        await this.doContribute(contributeAmount)
      }
    },
    async preFillClicked(amount) {
      if (this.validateAmount(amount)) {
        let contributeAmount = utils.parseUnits(amount.toString(), 8)
        await this.doContribute(contributeAmount)
      }
    },
    async doContribute(amountBig) {
      if (!this.contributeLoading) {
        try {
          this.contributeLoading = true
          await DevcashBounty.initEthConnector(this)
          this.confirmWindowOpen = true
          await this.$store.state.devcash.connector.contribute(
            this.bounty,
            amountBig
          )
          this.$notify({
            group: 'main',
            title: this.$t('notification.contributeFinishedTitle').replace("%1", "{D}").replace("%2", utils.formatUnits(amountBig, 8)),
            text: this.$t('notification.contributeFinishedDescription'),
            data: {},
            duration: -1
          });
          this.closeModal()            
        } catch (e) {
          if ('code' in e && e.code == 4001) {
            console.log(e)
          } else {
            this.$notify({
              group: 'main',
              title: this.$t('errors.errorTitle'),
              text: this.$t('errors.failedContribute'),
              data: {}
            })
            console.log(e)
          }
        } finally {
          this.confirmWindowOpen = false
          this.contributeLoading = false
          this.closeModal()
        }      
      }
    }
  }
};
</script>
<style scoped>
.contributeModal {
  overflow-y: scroll;
}
.closeButton {
  border-top-left-radius: 2rem;
  border-top-right-radius: 0.75rem;
  border-bottom-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}
</style>
