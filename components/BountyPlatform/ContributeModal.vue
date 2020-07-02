<template>
  <div
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
            @click="() => preFillClicked(10000)"
              class="text-c-light btn-secondary w-full transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}10,000" }}</button>
          </div>
          <!-- {D}20,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
            @click="() => preFillClicked(20000)"
              class="text-c-light btn-secondary w-full transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}20,000" }}</button>
          </div>
          <!-- {D}40,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
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
        <div class="w-full lg:w-2/3 flex flex-row justify-center items-start flex-wrap my-8">
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
              @blur="validateAmount"
            />
          </div>
          <p class="text-c-danger text-xs px-3 mt-2">{{ amountError?amountError:'&nbsp;' }}</p>
          <!-- Contribute Button -->
          <button
            @click="contributeClicked"
            class="text-c-light btn-secondary w-full md:w-auto transform hover:scale-md focus:scale-md bg-c-secondary transition-all origin-bottom-left duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 mt-3 md:mt-0 md:ml-4"
          >{{ $t("bountyPlatform.singleBounty.contribute.buttonContribute") }}</button>
        </div>
      </div>
      <!-- Divider -->
      <div class="bg-c-text w-full h-px2 opacity-10 rounded-tl-full rounded-br-full"></div>
      <!-- Bounty Address & QR Card -->
      <div class="w-full flex flex-row justify-center mt-8">
        <div>
          <BountyAddressCard
            :address="bountyChest"
            :qrValue="qrValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import BountyAddressCard from "~/components/BountyPlatform/BountyAddressCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Icon from "~/components/Icon.vue";
import { tokenAddress } from "~/plugins/devcash/config";
import { utils } from "ethers"

export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    BountyAddressCard,
    CTACard,
    Icon
  },
  props: {
    closeModal: Function,
    bountyChest: String
  },
  computed: {
    qrValue() {
      let qrContent = `ethereum:${this.bountyChest}&token=${this.tokenAddress}`
      if (this.qrAmount) {
        qrContent = `${qrContent}&value=${this.qrAmount}`
      }
      return qrContent
    }
  },
  data() {
    return {
      isCloseHovered: false,
      isCloseFocused: false,
      customAmount: null,
      amountError: "",
      qrAmount: null
    };
  },
  methods: {
    validateAmount() {
      let isValid = true
      try {
        let amountBigNum = utils.parseUnits(this.customAmount.toString(), 8)
        this.amountError = ""
      } catch (e) {
        this.amountError = this.$t('bountyPlatform.post.invalidAmount')
        isValid = false
      }  
      return isValid 
    },
    contributeClicked() {
      if (this.validateAmount()) {
        this.qrAmount = utils.parseUnits(this.customAmount.toString(), 8).toString()
      }
    },
    preFillClicked(amount) {
      this.qrAmount = utils.parseUnits(amount.toString(), 8).toString()
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
