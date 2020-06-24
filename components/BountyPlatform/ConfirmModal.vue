<template>
  <div
    class="max-w-full md:max-w-md h-auto flex flex-col items-center bg-c-background-sec border-2 border-c-text-05 shadow-4xl rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg overflow-y-scroll"
  >
    <!-- Header -->
    <div
      :class="{'bg-c-danger': type == 'decline', 'bg-c-success': type == 'approve' }"
      class="w-full flex flex-row justify-center px-4 py-2"
    >
      <h5
        class="text-center text-c-background text-2xl font-bold"
      >{{ type == 'decline' ? $t("bountyPlatform.confirmModal.confirmToDecline.header") : $t("bountyPlatform.confirmModal.confirmToApprove.header") }}</h5>
    </div>
    <!-- Paragraph -->
    <p
      class="text-center px-3 md:px-8 mt-4 mb-2"
    >{{ type == 'decline' ? $t("bountyPlatform.confirmModal.confirmToDecline.paragraph") : $t("bountyPlatform.confirmModal.confirmToApprove.paragraph") }}</p>
    <!-- Amount & Address Part -->
    <div class="w-full flex flex-col items-center my-4 px-2">
      <div
        class="flex flex-col flex-wrap justify-center rounded-xl px-4 py-2 shadow-xl border border-c-text-10"
      >
        <!-- DEV Amount -->
        <p
          :class="{'text-c-danger': type == 'decline', 'text-c-success': type == 'approve' }"
          class="text-xl font-bold text-center"
        >{D}{{formatAmount()}}</p>
        <!-- ETH & USD Amount -->
        <p class="text-center opacity-75 mt-1">{{`(Ξ${formatEthAmount()}`}}</p>
      </div>
      <!-- Indicator Icon -->
      <Icon
        class="my-3 w-8 h-8"
        :colorClass="type == 'decline'?'text-c-danger':'text-c-success'"
        :type="type == 'decline'? 'cancel':'arrow-down'"
      />
      <!-- Avatar & Address -->
      <div
        class="flex flex-row flex-wrap justify-center rounded-xl px-4 py-2 shadow-xl border border-c-text-10"
      >
        <Jazzicon class="flex" :diameter="20" :address="item.creator" />
        <p class="font-mono-jet text-left ml-2">
          {{
          item.creator.substring(0, 6) +
          "..." +
          item.creator.substring(item.creator.length - 4)
          }}
        </p>
      </div>
    </div>
    <!-- Feedback Area -->
    <div class="w-full flex flex-col bg-c-text-05 px-2 md:px-4 pt-4 pb-8 my-4">
      <label for="inputFeedback" class="text-center text-xl font-bold px-3">
        {{$t("bountyPlatform.confirmModal.inputFeedback.header")}}
        <span
          class="text-normal font-normal"
        >{{$t("bountyPlatform.confirmModal.inputFeedback.optional") }}</span>
      </label>
      <textarea
        v-model="inputFeedback"
        rows="4"
        id="inputFeedback"
        class="bg-c-text-10 border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
        type="text"
        :placeholder="$t('bountyPlatform.confirmModal.inputFeedback.placeholder')"
        @blur="validateFeedback"
      />
    </div>
    <!-- Cancel & Confirm Buttons -->
    <div class="w-full flex flex-row flex-wrap pt-2 pb-4 px-4">
      <!-- Cancel Button -->
      <div class="w-full md:w-1/2 flex flex-row p-2">
        <button
          @click="cancelCallback"
          class="w-full text-lg font-bold bg-c-background-sec text-c-text border-2 border-c-text btn-text-qua px-4 py-1_5 transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden"
        >{{ type == 'decline'?$t("bountyPlatform.confirmModal.confirmToDecline.buttonCancel"): $t("bountyPlatform.confirmModal.confirmToApprove.buttonCancel")}}</button>
      </div>
      <!-- Confirm Button -->
      <div class="w-full md:w-1/2 flex flex-row p-2 order-first md:order-last">
        <button
          :disabled="loading"
          @click="confirmClicked"
          :class="{'bg-c-danger border-c-danger': type == 'decline', 'bg-c-success border-c-success': type == 'approve' }"
          class="w-full text-lg font-bold btn-text-qua text-c-background border-2 px-4 py-1_5 transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden"
        >{{ type == 'decline'?$t("bountyPlatform.confirmModal.confirmToDecline.buttonConfirm"): $t("bountyPlatform.confirmModal.confirmToApprove.buttonConfirm")}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
export default {
    props: {
        type: String,
        item: Object,
        confirmCallback: Function,
        cancelCallback: Function
    },
    data() {
      return {
        inputFeedback: null,
        loading: false
      }
    },
    components: {
        Jazzicon,
        Icon
    },
    methods: {
        confirmClicked() {
          this.loading = true
          this.confirmCallback(this.inputFeedback, this.item, this.type)
        },
        validateFeedback(){
            return null
        },
        formatAmount() {
          let tokenDecimals = 8
          if (this.$store.state.devcash.connector) {
              tokenDecimals = this.$store.state.devcash.connector.tokenDecimals
          }   
          return DevcashBounty.formatAmountSingleSubmission(this.item.ubounty, tokenDecimals)
        },
        formatEthAmount() {
          return DevcashBounty.formatAmountSingleSubmissionEth(this.item.ubounty)
        },        
    }
}
</script>