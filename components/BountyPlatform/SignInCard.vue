<template>
  <div
    :class="type=='sign'?'shadow-4xl':'shadow-2xl-sec'"
    class="w-full max-h-full overflow-y-scroll flex flex-col items-center bg-c-background-sec border-2 border-c-text-05 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg px-4 py-6 md:px-12 md:py-8"
  >
    <!-- Verify via Wallet Modal -->
    <transition name="modalBgTransition">
      <div
        v-if="loggingInLoading"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="max-w-xl h-full flex flex-row justify-center items-center px-2 pt-24 pb-12 md:pt-36"
        >
          <multi-purpose-modal
            :header="$t('bountyPlatform.multiPurposeModal.verifyToSignIn.header')"
            :paragraph="$t('bountyPlatform.multiPurposeModal.verifyToSignIn.paragraph')"
            :imgSrc="require('~/assets/images/illustrations/foreground/lock.svg')"
            :hasSpinner="true"
          />
        </div>
      </div>
    </transition>
    <img
      class="w-24 md:w-32 h-auto relative -mt-2 md:-mt-4"
      :src="require('~/assets/images/illustrations/foreground/lock.svg')"
      alt="Lock"
    />
    <h4
      class="text-c-primary text-2xl text-center font-bold mt-2"
    >{{ loggingInLoading?$t('bountyPlatform.multiPurposeModal.verifyToSignIn.header'):type=='sign'?$t("bountyPlatform.signInCard.headerSignIn"):$t("bountyPlatform.signInCard.headerSignInToContinue") }}</h4>
    <p
      class="text-c-text text-center mt-2"
    >{{loggingInLoading?$t('bountyPlatform.multiPurposeModal.verifyToSignIn.paragraph'):type=='sign'?$t("bountyPlatform.signInCard.paragraphSignIn"): $t("bountyPlatform.signInCard.paragraphSignInToContinue") }}</p>
    <div v-if="!loggingInLoading" class="w-full max-w-xxs flex flex-col mt-4">
      <!-- MetaMask Button -->
      <button
        @click="signIn(walletProviders.metamask)"
        class="w-full btn-text-qua flex flex-row items-center bg-c-metamask border-2 border-c-metamask transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-2"
      >
        <div class="bg-c-background-ter h-12 w-12 p-2">
          <img
            class="w-full h-full"
            :src="require('~/assets/images/wallet-logos/MetaMask.svg')"
            alt="MetaMask"
          />
        </div>
        <div class="flex flex-row flex-1 justify-center">
          <h4
            class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
          >{{ true ? $t("wallet.metamask") : $t("wallet.getMetamask") }}</h4>
        </div>
      </button>
      <!-- Portis Button -->
      <button
        @click="signIn(walletProviders.portis)"
        class="w-full btn-text-qua flex flex-row items-center bg-c-portis border-2 border-c-portis transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-2"
      >
        <div class="bg-c-background-ter h-12 w-12 p-2">
          <img
            class="w-full h-full"
            :src="require('~/assets/images/wallet-logos/Portis.svg')"
            alt="Portis"
          />
        </div>
        <div class="flex flex-row flex-1 justify-center">
          <h4
            class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
          >{{ $t("wallet.portis") }}</h4>
        </div>
      </button>
      <!-- Authereum Button -->
      <button
        @click="signIn(walletProviders.authereum)"
        class="w-full btn-text-qua flex flex-row items-center bg-c-authereum border-2 border-c-authereum transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-2"
      >
        <div class="bg-c-background-ter h-12 w-12 p-2">
          <img
            class="w-full h-full"
            :src="require('~/assets/images/wallet-logos/Authereum.svg')"
            alt="Authereum"
          />
        </div>
        <div class="flex flex-row flex-1 justify-center">
          <h4
            class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
          >{{ $t("wallet.authereum") }}</h4>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import {
  WalletProviders,
  DevcashBounty
} from "~/plugins/devcash/devcashBounty.client";
export default {
  data() {
    return {
      walletProviders: WalletProviders,
      loggingInLoading: false
    };
  },
  props: {
    closeModal: Function,
    type: null
  },
  components: {
    MultiPurposeModal
  },
  methods: {
    async signIn(provider) {
      // Sign in flow
      this.loggingInLoading = true;
      try {
        await DevcashBounty.signIn(this, provider)
      } catch (e) {
        console.log(e)
      } finally {
        this.loggingInLoading = false;
        if(this.closeModal){
          this.closeModal()
        }
      }
    },  
  }
}
</script>